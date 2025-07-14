import { Request, Response } from "express";
import { successResponse } from "../utils/apiResponse.js";
import { BadResponseException, InvalidRequestException, NotFoundException } from "../utils/exceptions.js";
import { validateAndParseDto } from "../utils/validateAndParseDto.js";
import { UnipileService } from "../services/unipile.service.js";
import { IAttendee } from "../utils/types/unipile.js";
import { AttendeeDao } from "../dao/attendee.dao.js";
import { AttendeeDomainModel, AttendeeResponseDto, CreateAttendeeRequestDto } from "../dto/attendee.dto.js";

export class AttendeeController {
    constructor(
        private readonly attendeeDao: AttendeeDao,
        private readonly unipileService: UnipileService
    ) { }


    private async _validateAndPrepareAttendeePayloads(createAttendeesRequest: any[]): Promise<AttendeeDomainModel[]> {
        const validAttendees: AttendeeDomainModel[] = [];

        for (const [index, attendeeRequest] of createAttendeesRequest.entries()) {
                const [attendeeDto, errors] = await validateAndParseDto(CreateAttendeeRequestDto, attendeeRequest);
                if (errors.length) {
                    throw new InvalidRequestException(`Validation error in attendee at index ${index}: ${errors.join(', ')}`);
                }

                const domainAttendee: AttendeeDomainModel = {
                    _id: attendeeDto.id,
                    accountId: attendeeDto.accountId,
                    name: attendeeDto.name,
                    providerId: attendeeDto.providerId,
                    pictureUrl: attendeeDto.pictureUrl,
                    profileUrl: attendeeDto.profileUrl,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                };
                validAttendees.push(domainAttendee);
        }

        return validAttendees;
    }


    private async _validateAttendeeResponses(createdAttendees: AttendeeDomainModel[]): Promise<AttendeeResponseDto[]> {
        const validatedResponses: AttendeeResponseDto[] = [];

        for (const [index, attendee] of createdAttendees.entries()) {
            const [validated, responseErrors] = await validateAndParseDto(AttendeeResponseDto, attendee);
            if (responseErrors.length) {
                throw new BadResponseException(`Response validation failed at index ${index}: ${responseErrors.join(', ')}`);
            }
            validatedResponses.push(validated);
        }

        return validatedResponses;
    }


    public async createBulkAttendeesUseCase(createAttendeesRequest: any[]): Promise<AttendeeResponseDto[]> {
        const validAttendees = await this._validateAndPrepareAttendeePayloads(createAttendeesRequest);
        const createdAttendees = await this.attendeeDao.bulkCreate(validAttendees);
        return await this._validateAttendeeResponses(createdAttendees);
    }


    async bulkCreateAttendees(req: Request, res: Response) {
        const createAttendeesRequest = Array.isArray(req.body) ? req.body : [];
        if (!createAttendeesRequest.length) {
            throw new InvalidRequestException('Request body must be a non-empty array of attendees');
        }

        const response = this.createBulkAttendeesUseCase(createAttendeesRequest)

        return successResponse(res, response, 201);
    }


    private _convertAttendeesToDomainModel(attendees: IAttendee[]): AttendeeDomainModel[] {
        return attendees.map(unipileAttendee => {
            const attendeeDbEntry = new AttendeeDomainModel();
            attendeeDbEntry._id = unipileAttendee.id;
            attendeeDbEntry.accountId = unipileAttendee.accountId;
            attendeeDbEntry.name = unipileAttendee.name;
            attendeeDbEntry.providerId = unipileAttendee.providerId;
            attendeeDbEntry.pictureUrl = unipileAttendee.pictureUrl;
            attendeeDbEntry.profileUrl = unipileAttendee.profileUrl;
            attendeeDbEntry.createdAt = new Date();
            attendeeDbEntry.updatedAt = new Date();
            attendeeDbEntry.deletedAt = null;
            return attendeeDbEntry;
        });
    }

    async getAllAttendees(_: Request, res: Response) {
        let [attendeeDbEntries, attendee] = await Promise.all([
            this.attendeeDao.getAll(),
            this.unipileService.getAllAttendees()
        ]);

        const dbAttendeeIds = new Set(attendeeDbEntries.map(entry => entry._id));
        const attendeesNotInDb = attendee.filter(unipileAttendee => !dbAttendeeIds.has(unipileAttendee.id));

        await this.createBulkAttendeesUseCase(attendeesNotInDb);

        attendeeDbEntries = await this.attendeeDao.getAll();

        const attendees: AttendeeResponseDto[] = [];
        for (const attendee of attendeeDbEntries) {
            const [validated, errors] = await validateAndParseDto(AttendeeResponseDto, attendee);
            if (errors.length) throw new BadResponseException(errors.join(', '));
            attendees.push(validated);
        }

        return successResponse(res, attendees, 200);
    };
}
