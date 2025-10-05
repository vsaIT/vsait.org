-- Add constraints for event datetime timings and max registrations
ALTER TABLE "Event"
ADD CONSTRAINT "Event_end_after_start" CHECK ("endTime" > "startTime"),
ADD CONSTRAINT "Event_registration_before_start" CHECK ("registrationDeadline" < "startTime"),
ADD CONSTRAINT "Event_cancellation_before_start" CHECK ("cancellationDeadline" < "startTime"),
ADD CONSTRAINT "Event_cancellation_before_registration" CHECK ("cancellationDeadline" <= "registrationDeadline"),
ADD CONSTRAINT "Event_max_registrations_non_negative" CHECK ("maxRegistrations" >= 0);