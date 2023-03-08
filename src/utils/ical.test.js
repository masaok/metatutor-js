import ical from 'ical'
import IcalExpander from 'ical-expander'

describe('ical', () => {
  it('should use ical-expander', () => {
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

    const data = ical.parseICS('content from ical file')

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

  it.skip('should use ical-expander', () => {
    const ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Inc//Google Calendar 70.9054//EN
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
`

    const icalExpander = new IcalExpander({ ical, maxIterations: 1000 })
    const events = icalExpander.between(new Date('2020-01-01'), new Date('2020-12-31'))
    console.log(events)
  })
})
