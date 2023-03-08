import ical from 'ical'
import IcalExpander from 'ical-expander'

const rawIcs = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Access-A-Ride Pickup
DTSTART;TZID=America/New_York:20130802T103400
DTEND;TZID=America/New_York:20130802T110400
LOCATION:1000 Broadway Ave.\, Brooklyn
DESCRIPTION: Access-A-Ride trip to 900 Jay St.\, Brooklyn
STATUS:CONFIRMED
SEQUENCE:3
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Pickup Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
BEGIN:VEVENT
SUMMARY:Access-A-Ride Pickup
DTSTART;TZID=America/New_York:20130802T200000
DTEND;TZID=America/New_York:20130802T203000
LOCATION:900 Jay St.\, Brooklyn
DESCRIPTION: Access-A-Ride trip to 1000 Broadway Ave.\, Brooklyn
STATUS:CONFIRMED
SEQUENCE:3
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Pickup Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`

describe('ical', () => {
  // Basic Ical parsing library
  // https://www.npmjs.com/package/ical
  it('should use ical.js', () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const data = ical.parseICS(rawIcs)

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        var ev = data[k]
        if (data[k].type == 'VEVENT') {
          console.log(
            `${ev.summary} is in ${ev.location} on the ${ev.start.getDate()} of ${
              months[ev.start.getMonth()]
            } at ${ev.start.toLocaleTimeString('en-GB')}`
          )
        }
      }
    }
  })

  // Ical Expander
  // https://www.npmjs.com/package/ical-expander
  it.skip('should use ical-expander', () => {
    const ical = rawIcs

    // IcalExpander constructor throws error:
    // TypeError: Cannot read properties of undefined (reading 'length')
    const icalExpander = new IcalExpander({ ical, maxIterations: 1000 })
    const events = icalExpander.between(new Date('2020-01-01'), new Date('2020-12-31'))
    console.log(events)
  })
})
