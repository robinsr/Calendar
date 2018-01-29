package app;

import app.appointment.AppointmentController;
import app.appointment.AppointmentDao;
import app.util.Filters;
import spark.Request;
import spark.Response;

import static spark.Spark.*;

public class Application {

    public static AppointmentDao appointmentDao;

    public static void main(String[] args) {
        appointmentDao = new AppointmentDao();

        // Configure Spark
        port(4567);
        staticFiles.location("/public");
        staticFiles.expireTime(600L);

        before("*",                 Filters.addTrailingSlashes);

        path("/appointments", () -> {
            before("/*",            Filters.addJsonHeader);
            before("/:id",          Filters.parseAppointmentJson);
            get("/",                AppointmentController.getRecentAppointments);
            get("/all",             AppointmentController.getAllAppointments);
            get("/:year/:month",    AppointmentController.getAppointmentsByYearAndMonth);
            put("/:id",             AppointmentController.updateAppointment);
            post("/:id",            AppointmentController.createAppointment);
        });

        notFound((Request req, Response res) -> {
            res.header("Content-Type", "text/html");
            return "Not found";
        });

        appointmentDao.bootstrap();
    }
}
