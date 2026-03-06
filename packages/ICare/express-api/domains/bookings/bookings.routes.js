import { Router } from "express";
import {
    getMe,
    getCaregiverProfile,
    createBooking,
    listCareReceiverBookings,
    listCaregiverBookings,
    acceptBooking,
    getBookingDetail,
    submitReview,
    listCaregiverReviews,
    cancelBooking
} from "./bookings.controller.js";

const router = Router();

router.get("/users/me", getMe);
router.get("/caregivers/:caregiverId", getCaregiverProfile);
router.post("/bookings", createBooking);
router.get("/care-receivers/me/bookings", listCareReceiverBookings);
router.get("/caregivers/me/bookings", listCaregiverBookings);
router.put("/caregiver/bookings/:bookingId/accept", acceptBooking);
router.get("/bookings/:bookingId", getBookingDetail);
router.post("/bookings/:bookingId/review", submitReview);
router.get("/caregivers/:caregiverId/reviews", listCaregiverReviews);
router.put("/bookings/:bookingId/cancel", cancelBooking);

export default router;
