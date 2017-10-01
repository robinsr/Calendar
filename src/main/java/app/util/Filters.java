package app.util;

import app.appointment.Appointment;
import spark.Filter;
import spark.Request;
import spark.Response;

import static app.util.JsonUtil.jsonToData;

public class Filters {
    public static Filter parseAppointmentJson = (Request req, Response res) -> {
        if (req.requestMethod().equals("POST")) {
            Appointment appt = (Appointment) jsonToData(req.body(), Appointment.class);
            req.attribute("appt", appt);
        }
    };
}
