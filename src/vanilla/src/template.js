/**
* template functions (es6 template strings)
*/

import moment from 'moment';

const html = (literalSections, ...substs) => {
  // Use raw literal sections: we don’t want
  // backslashes (\n etc.) to be interpreted
  let raw = literalSections.raw;

  let result = '';

  substs.forEach((subst, i) => {
    // Retrieve the literal section preceding
    // the current substitution
    let lit = raw[i];

    // In the example, map() returns an array:
    // If substitution is an array (and not a string),
    // we turn it into a string
    if (Array.isArray(subst)) {
      subst = subst.join('');
    }

    // If the substitution is preceded by a dollar sign,
    // we escape special characters in it
    if (lit.endsWith('$')) {
      subst = htmlEscape(subst);
      lit = lit.slice(0, -1);
    }
    result += lit;
    result += subst;
  });
  // Take care of last literal section
  // (Never fails, because an empty template string
  // produces one literal section, an empty string)
  result += raw[raw.length-1]; // (A)

  return result;
};

const calendar = data => html`
  ${controls(data)}
  <ul id="calendar" class="full-width weeks-${data.weekCount}">
    ${header()}
    ${data.days.map(data => day(data))}
  </ul>
`;

const controls = data => {
  const prev = moment(data.iso).subtract(1, 'month');
  const curr = moment(data.iso);
  const next = moment(data.iso).add(1, 'month');

  return html`
    <div id="controls">
      <a class="item" href="#/${prev.format('MM')}/${prev.format('YYYY')}">Back one month</a>
      <p class="item">${curr.format('MMMM')}, ${curr.format('YYYY')}</p>
      <a class="item" href="#/${next.format('MM')}/${next.format('YYYY')}">Forward one month</a>
    </div>
  `;
};

const day = data => html`
  <li class="day ${data.isInMonthRange?'this-month':'other-month'} in" data-iso="${data.iso}">
    <p class="date">${ moment(data.iso).format('D') }</p>
    <ul>${data.appointments.map(appt => html`
      <li class="item" draggable="true" data-key="${appt.id}">${appt.title}</li>`)}</ul>
  </li>
`;

const details = data => html`
  <div id="eventDetails">
    <p class="eventDetailsItem">title:</p><span>${data.title}</span><br>
    <p class="eventDetailsItem">date:</p><span>${data.date}</span><br>
    <p class="eventDetailsItem">time:</p> <span>${data.time}</span><br>
    <p class="eventDetailsItem">description:</p><span>${data.description}</span><br>
    <div class="closeModal">
        <p><a>click here to close</a></p>
    </div>
  </div>
`;

const header = () => {
  const m = moment();
  return html`${[0,1,2,3,4,5,6].map(n => `
    <li class="header">${m.day(n).format('dddd')}</li>`)}`;
};

export { controls, calendar };