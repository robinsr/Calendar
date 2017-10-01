package app;

import app.appointment.AppointmentController;
import app.appointment.AppointmentDao;
import app.util.Filters;

import static spark.Spark.*;

public class Application {

    public static AppointmentDao appointmentDao;

    public static void main(String[] args) {
        appointmentDao = new AppointmentDao();

        // Configure Spark
        port(4567);
        staticFiles.location("/public");
        staticFiles.expireTime(600L);

        get("/appointments/:year/:month", AppointmentController.getAppointmentsByYearAndMonth);
        get("/appointments/all", AppointmentController.getAllAppointments);
        get("/appointments", AppointmentController.getRecentAppointments);

        before("/appointments/:id", Filters.parseAppointmentJson);
        post("/appointments/:id", AppointmentController.createAppointment);
        put("/appointments/:id", AppointmentController.updateAppointment);

        appointmentDao.bootstrap();
    }
}
