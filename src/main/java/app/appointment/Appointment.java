package app.appointment;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Data;
import org.joda.time.DateTime;

import app.util.DateFormats;

@Data
public class Appointment {
    String title;
    String description;
    DateTime dateTime;
    String date;
    String time;
    String id;

    @JsonGetter("dateTime")
    public String getDateTimeJson() {
        return dateTime.toString(DateFormats.DATETIME);
    }
}
