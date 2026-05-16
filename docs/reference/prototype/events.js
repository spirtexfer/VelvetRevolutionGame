// Velvet Revolution event chronology — Nov 17 to Dec 29, 1989
// Prototype reference — 28 events with rich narrative text
// Use for merging narrative into the final events.js

window.VR_EVENTS_PROTOTYPE = [
  {
    id: "n17",
    date: "PRAGUE — NOVEMBER 17, 1989 — 20:00",
    headline: "Národní Třída Drowned In Blood",
    kicker: "Student march from Albertov ends under truncheons.",
    body: "Some 15,000 students marching for International Students' Day were funnelled onto Národní avenue between the National Theatre and Můstek. Riot units (red berets, white helmets) closed both ends. Beatings lasted over an hour. Late tonight a witness names a dead student — Martin Šmíd, mathematics faculty — though no body has been seen.",
    choices: [
      {
        id: "rumor",
        label: "RUN THE RUMOR",
        draft: "Print the unconfirmed death of student Martin Šmíd. Light the fuse. The country must know what was done tonight.",
        deltas: { pressure: 18, suspicion: 14, fame: 16, credibility: -8 },
        outcome: "The city is awake by morning. But Šmíd may yet be alive."
      },
      {
        id: "verify",
        label: "VERIFY BEFORE PRESS",
        draft: "Hold the page. Send Hana to the morgue, Pavel to the hospitals. We print only what we have walked past with our own eyes.",
        deltas: { pressure: 6, suspicion: 4, fame: 4, credibility: 12 },
        outcome: "By dawn we have names, beds, faces. A slower thunder, but a thunder."
      },
      {
        id: "eyewitness",
        label: "COLLECT EYEWITNESS COLUMN",
        draft: "Twelve testimonies. Numbered. Signed. No editorial — let the batons speak for themselves.",
        deltas: { pressure: 12, suspicion: 8, fame: 10, credibility: 8 },
        outcome: "The column circulates in factories before the noon shift."
      }
    ]
  },
  {
    id: "n18",
    date: "PRAGUE — NOVEMBER 18, 1989 — 09:00",
    headline: "Theatres Strike, Students Occupy",
    kicker: "The actors close their houses. The faculties barricade their doors.",
    body: "Drama school students call a strike. DAMU and FAMU fill with mattresses and typewriters. Prague theatres — Realistic, Na zábradlí, Vinohrady — cancel their evening performances and read aloud the names of the beaten in place of the play. The actors' assembly votes a national strike of theatres from Monday.",
    choices: [
      {
        id: "broadside",
        label: "PRINT THE LIST",
        draft: "Every name we have verified, the hospitals where they lie, the wards. Paste it on every tram stop in District 1.",
        deltas: { pressure: 14, suspicion: 10, fame: 12, credibility: 10 },
        outcome: "By dusk the list is in Brno, Bratislava, Plzeň."
      },
      {
        id: "interview",
        label: "INTERVIEW THE ACTORS",
        draft: "Sit with the strikers in the Realistic. Let them speak as themselves, not as characters.",
        deltas: { pressure: 8, suspicion: 4, fame: 14, credibility: 8 },
        outcome: "Three actresses send copy themselves, signed in full."
      }
    ]
  },
  {
    id: "n19",
    date: "PRAGUE — NOVEMBER 19, 1989 — 22:00",
    headline: "Civic Forum Founded At The Činoherní Klub",
    kicker: "Havel, Dienstbier, Křižan — a coalition is born in a basement.",
    body: "Tonight in the smoke of the Činoherní Klub, opposition writers, priests, and ex-Charter signatories form Občanské fórum. The demand: resignation of those responsible for Friday's violence, and the release of all political prisoners.",
    choices: [
      {
        id: "declare",
        label: "DECLARE THE FORUM",
        draft: "Front page, masthead-width. Print their eight demands in full. This is no longer scattered grief — this is a program.",
        deltas: { pressure: 20, suspicion: 14, fame: 18, credibility: 10 },
        outcome: "Forum chapters declared in 14 cities within 48 hours."
      },
      {
        id: "footnote",
        label: "RUN AS BACK-PAGE BRIEF",
        draft: "Three column inches, page four, under the weather. Let the StB underestimate them one more day.",
        deltas: { pressure: 4, suspicion: -6, fame: 2, credibility: 4 },
        outcome: "The Forum grows in the quiet. So does our caution."
      },
      {
        id: "demands",
        label: "PUBLISH THE EIGHT DEMANDS ONLY",
        draft: "No names, no faces. Just the demands. Let readers carry them home and decide for themselves.",
        deltas: { pressure: 14, suspicion: 6, fame: 8, credibility: 14 },
        outcome: "The demands are recited from the pulpit at Týn by Sunday."
      }
    ]
  },
  {
    id: "n20",
    date: "PRAGUE — NOVEMBER 20, 1989 — 16:30",
    headline: "200,000 Fill Wenceslas Square",
    kicker: "The largest gathering since 1968. The square is one body.",
    body: "From the National Museum to Můstek, the square is shoulder-to-shoulder. Keys jangle. 'Havel na Hrad' is heard for the first time as a mass chant. The Letná plateau is whispered as the next stage.",
    choices: [
      {
        id: "aerial",
        label: "PUBLISH AERIAL ESTIMATE",
        draft: "Borrow the architect's roof on Vodičkova. Count by grid. Print the number — 200,000 — in 96-point above the fold.",
        deltas: { pressure: 18, suspicion: 12, fame: 20, credibility: 12 },
        outcome: "Rude Právo says 30,000. Nobody believes them anymore."
      },
      {
        id: "voices",
        label: "TWENTY VOICES FROM THE SQUARE",
        draft: "A pensioner. A welder. A nun. A soldier on leave. Twenty paragraphs, twenty names.",
        deltas: { pressure: 10, suspicion: 4, fame: 14, credibility: 18 },
        outcome: "The 'welder from Kladno' becomes a household figure by Friday."
      },
      {
        id: "compare",
        label: "COMPARE TO AUGUST 1968",
        draft: "Side-by-side photographs, 21 years apart. Same square, same chant, different ending — if we can hold the line.",
        deltas: { pressure: 14, suspicion: 16, fame: 12, credibility: 8 },
        outcome: "Old men weep on the trams. Old colonels read us twice."
      }
    ]
  }
];
