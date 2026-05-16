window.VR_EVENTS = [
  // ── EVENT 1 ── Nov 17 08:00 ───────────────────────────────────────
  {
    id: "n17_0800",
    date: "PRAGUE — NOVEMBER 17, 1989 — 08:00",
    headline: "Students Gather Before The March",
    kicker: "At Albertov, something older than fear is stirring.",
    body: "University students crowd the lecture halls and corridors of Albertov, debating whether to march on National Students' Day. The official permit covers the cemetery at Vyšehrad only — what lies beyond is improvised. Organisers argue, whisper, decide. By ten o'clock the route is set.",
    choices: [
      {
        id: "call_them_out",
        label: "CALL THEM OUT",
        draft: "We print the route, the time, the meeting point at Albertov. Our readers must know what is forming today.",
        deltas: { pressure: 6, suspicion: 3, fame: 10, credibility: 15 },
        outcome: "The extra dispatched by noon found two hundred new hands by dusk."
      },
      {
        id: "wait_and_watch",
        label: "WAIT AND WATCH",
        draft: "Nothing goes to press until we know it holds. We send a correspondent to Albertov and hold the page.",
        deltas: { pressure: 0, suspicion: 0, fame: 0, credibility: 0 },
        outcome: "We published nothing — but we were there when it mattered."
      },
      {
        id: "print_official_route",
        label: "PRINT THE OFFICIAL ROUTE ONLY",
        draft: "We note the permitted memorial gathering at Vyšehrad. No mention of student chatter or alternate routes.",
        deltas: { pressure: -10, suspicion: -10, fame: 10, credibility: -15 },
        outcome: "Readers found us cautious and moved to bolder sheets."
      }
    ]
  },

  // ── EVENT 2 ── Nov 17 10:00 ───────────────────────────────────────
  {
    id: "n17_1000",
    date: "PRAGUE — NOVEMBER 17, 1989 — 10:00",
    headline: "State Papers Praise A Peaceful Memorial",
    kicker: "Rudé Právo calls it orderly — the students are already beyond the cemetery gates.",
    body: "The Party daily leads with photographs of the permitted ceremony at Jan Opletal's grave, commending the students for solemn observance. The Interior Ministry releases a prepared statement. In private every editor knows the march will go on long after the cameras leave Vyšehrad.",
    choices: [
      {
        id: "expose_the_lie",
        label: "EXPOSE THE LIE",
        draft: "We reprint their headline beside our own correspondent's notes from Albertov. Let readers judge the gap.",
        deltas: { pressure: -20, suspicion: -20, fame: 10, credibility: -10 },
        outcome: "We exposed state media — but too early, before the crackdown, and readers called it premature."
      },
      {
        id: "contrast_report",
        label: "RUN THE CONTRAST",
        draft: "What Rudé Právo says this morning. What our reporter saw at Albertov two hours later. Two columns, one page.",
        deltas: { pressure: 2, suspicion: 3, fame: 0, credibility: 5 },
        outcome: "The contrast landed hard. Copies passed hand to hand in the afternoon trams."
      },
      {
        id: "hold_commentary",
        label: "HOLD COMMENTARY",
        draft: "We note the government statement without gloss. Events will speak louder than our editorial voice today.",
        deltas: { pressure: 0, suspicion: 0, fame: 0, credibility: 0 },
        outcome: "We stayed quiet. By evening we had more to say."
      }
    ]
  },

  // ── EVENT 3 ── Nov 17 14:00 ───────────────────────────────────────
  {
    id: "n17_1400",
    date: "PRAGUE — NOVEMBER 17, 1989 — 14:00",
    headline: "Protest Routes Circulate Underground",
    kicker: "Mimeographed sheets move faster than the trams today.",
    body: "Student organisers are distributing hand-drawn maps of the proposed march route — Albertov south along the embankment toward Národní třída and the centre. The sheets pass through lecture halls, bookshop back rooms, and church porches. The secret police are watching, but the paper moves faster.",
    choices: [
      {
        id: "reprint_routes",
        label: "REPRINT THE ROUTES",
        draft: "We reproduce the route in full. If readers are going, they deserve a map they can read.",
        deltas: { pressure: 12, suspicion: 14, fame: 10, credibility: 0 },
        outcome: "Every copy was gone within the hour. The route reached three districts by four o'clock."
      },
      {
        id: "note_the_march",
        label: "NOTE THE MARCH, VERIFY DETAILS",
        draft: "We confirm a march is planned from Albertov and will report fully once we have verified the route and size.",
        deltas: { pressure: 2, suspicion: 4, fame: 0, credibility: 10 },
        outcome: "The cautious note preserved credibility, though bolder sheets beat us to the street."
      },
      {
        id: "stay_silent_routes",
        label: "STAY SILENT",
        draft: "Nothing in print about routes. Too early. Too dangerous for the organisers if we publicise them.",
        deltas: { pressure: -10, suspicion: -10, fame: 0, credibility: 0 },
        outcome: "We printed nothing. The march happened anyway, and readers wondered where we were."
      }
    ]
  },

  // ── EVENT 4 ── Nov 17 16:00 ───────────────────────────────────────
  {
    id: "n17_1600",
    date: "PRAGUE — NOVEMBER 17, 1989 — 16:00",
    headline: "Fifteen Thousand March From Albertov",
    kicker: "International Students' Day becomes something the regime did not anticipate.",
    body: "The column leaves Albertov at four, swells at Vyšehrad, and moves north along the embankment. Banners appear: Jan Opletal's portrait, a torn Party card, a hand-lettered sheet reading 'Svoboda'. The march is peaceful, disciplined, and far larger than any official gathering since the Prague Spring.",
    attendance: 15000,
    choices: [
      {
        id: "lead_with_numbers",
        label: "LEAD WITH THE NUMBERS",
        draft: "We put fifteen thousand on the front line of the dispatch. Rudé Právo will not. Someone must.",
        deltas: { pressure: 52, suspicion: 25, fame: 30, credibility: 10 },
        outcome: "Fifteen thousand became a phrase repeated in every kitchen by midnight."
      },
      {
        id: "describe_the_march",
        label: "DESCRIBE THE MARCH",
        draft: "We write what we saw: the banners, the faces, the flags moving up the embankment. Numbers to follow when confirmed.",
        deltas: { pressure: 2, suspicion: 1, fame: 10, credibility: 10 },
        outcome: "The dispatch read vividly. Readers felt they had been there."
      },
      {
        id: "no_coverage_march",
        label: "HOLD — WAIT FOR THE OUTCOME",
        draft: "The march continues. We print nothing until we know how it ends.",
        deltas: { pressure: -40, suspicion: -20, fame: 0, credibility: -10 },
        outcome: "Caution cost us the first edition. The march ended in blood while we waited."
      }
    ]
  },

  // ── EVENT 5 ── Nov 17 18:30 ───────────────────────────────────────
  {
    id: "n17_1830",
    date: "PRAGUE — NOVEMBER 17, 1989 — 18:30",
    headline: "Národní Třída Drowned In Blood",
    kicker: "Student march from Albertov ends under truncheons.",
    body: "Some 15,000 students were funnelled onto Národní avenue between the National Theatre and Můstek. Riot units — red berets, white helmets — closed both ends of the street. Beatings lasted over an hour. Witnesses describe people pressed against iron gates, unable to flee, falling under batons. Dozens are carried to the Všeobecná Faculty Hospital.",
    attendance: 15000,
    choices: [
      {
        id: "name_the_atrocity",
        label: "NAME THE ATROCITY",
        draft: "We print what happened on Národní. The street, the riot units, the blood on the pavement. Every name we have.",
        deltas: { pressure: 98, suspicion: 50, fame: 40, credibility: 30 },
        outcome: "Copies passed from hand to hand across three districts before morning."
      },
      {
        id: "report_carefully",
        label: "REPORT CAREFULLY",
        draft: "We describe the confrontation, the injuries, the hospital transports. We attribute every claim to a named witness.",
        deltas: { pressure: 4, suspicion: 2, fame: 10, credibility: -10 },
        outcome: "Careful reporting held the line — but bolder sheets set the city's anger alight first."
      },
      {
        id: "await_official_account",
        label: "AWAIT THE OFFICIAL ACCOUNT",
        draft: "We note there was an incident on Národní and await the Interior Ministry's statement before publishing details.",
        deltas: { pressure: -80, suspicion: -40, fame: 10, credibility: -30 },
        outcome: "We waited. The official account called it orderly. Nobody believed the official account — or us."
      }
    ]
  },

  // ── EVENT 6 ── Nov 17 20:00 ───────────────────────────────────────
  {
    id: "n17_2000",
    date: "PRAGUE — NOVEMBER 17, 1989 — 20:00",
    headline: "Witnesses Speak From Národní",
    kicker: "Twelve testimonies. The batons still speak for themselves.",
    body: "Throughout the evening, students and bystanders who were on Národní make their way to apartments across the city and begin to talk. Names, injuries, the exact sequence of events. One woman describes shielding her face against a grate while mounted police drove the crowd back. Another student counted the helmet markings. The record is assembling itself.",
    choices: [
      {
        id: "print_testimonies",
        label: "PRINT THE TESTIMONIES",
        draft: "Twelve testimonies. Numbered. Signed. No editorial — let the batons speak for themselves.",
        deltas: { pressure: 21, suspicion: 19, fame: 20, credibility: 30 },
        outcome: "The column circulates in factories before the noon shift on Saturday."
      },
      {
        id: "selected_testimony",
        label: "RUN SELECTED TESTIMONY",
        draft: "Three voices, carefully verified. We name the hospital wards. We do not speculate beyond what we have confirmed.",
        deltas: { pressure: 2, suspicion: 1, fame: 0, credibility: 40 },
        outcome: "Credibility hardened. These three accounts were quoted in foreign radio broadcasts."
      },
      {
        id: "suppress_testimony",
        label: "HOLD — TOO DANGEROUS TO NAME WITNESSES",
        draft: "We do not print names. Witnesses may be identified and arrested. We summarise without attribution.",
        deltas: { pressure: -40, suspicion: -20, fame: 0, credibility: -20 },
        outcome: "Nameless accounts were dismissed as rumour. The moment slipped through our pages."
      }
    ]
  },

  // ── EVENT 7 ── Nov 17 21:00 ───────────────────────────────────────
  {
    id: "n17_2100",
    date: "PRAGUE — NOVEMBER 17, 1989 — 21:00",
    headline: "Hospitals Fill With Students",
    kicker: "The beds at Všeobecná and Motol tell a story the government cannot erase.",
    body: "The emergency wards at Všeobecná Faculty Hospital and the Motol children's hospital are receiving the injured from Národní. Nurses count fractures, lacerations, concussions. One doctor, off the record, says she has not seen injuries like these since a factory accident in 1981. In the waiting rooms, parents sit in winter coats and do not speak.",
    choices: [
      {
        id: "print_hospital_report",
        label: "PRINT THE HOSPITAL REPORT",
        draft: "We list the wards, the injury counts, the doctor's words — preserved anonymously. The beds are evidence.",
        deltas: { pressure: 24, suspicion: 22, fame: 20, credibility: 20 },
        outcome: "The hospital report was reprinted by Free Europe within twenty-four hours."
      },
      {
        id: "note_injured",
        label: "NOTE THE INJURED, HOLD DETAILS",
        draft: "We confirm injuries have been sustained and hospitals are receiving patients. Full details when we have them safely.",
        deltas: { pressure: 1, suspicion: 0, fame: 0, credibility: 10 },
        outcome: "Caution kept the doctor safe. The story waited for morning."
      },
      {
        id: "deny_significance",
        label: "DOWNPLAY — STANDARD DISPERSAL",
        draft: "We describe the dispersal as proportionate crowd control, consistent with police procedure.",
        deltas: { pressure: -30, suspicion: -10, fame: 0, credibility: -10 },
        outcome: "We lost readers and our own self-respect in the same sentence."
      }
    ]
  },

  // ── EVENT 8 ── Nov 17 22:00 ───────────────────────────────────────
  {
    id: "n17_2200",
    date: "PRAGUE — NOVEMBER 17, 1989 — 22:00",
    headline: "A Student Named Dead On Národní",
    kicker: "The name Martin Šmíd reaches every midnight kitchen in the city.",
    body: "Late tonight a witness names a dead student — Martin Šmíd, mathematics faculty — though no body has been confirmed and no official announcement has been made. The information is spreading by telephone across Prague. If true, it changes everything. If false, it could destroy the credibility of everyone who printed it.",
    choices: [
      {
        id: "run_the_rumor",
        label: "RUN THE RUMOR",
        draft: "Print the unconfirmed death of student Martin Šmíd. Light the fuse. The country must know what was done tonight.",
        deltas: { pressure: 36, suspicion: 39, fame: 40, credibility: -60 },
        outcome: "The city is awake by morning. But Šmíd is alive — and our credibility pays the price."
      },
      {
        id: "verify_smid",
        label: "VERIFY BEFORE PRESS",
        draft: "Hold the page. Send Hana to the morgue, Pavel to the hospitals. We print only what we have walked past with our own eyes.",
        deltas: { pressure: 4, suspicion: 3, fame: 10, credibility: -10 },
        outcome: "By dawn we have names, beds, faces. A slower thunder, but a thunder."
      },
      {
        id: "no_death_story",
        label: "DO NOT PRINT UNCONFIRMED DEATHS",
        draft: "We note widespread public alarm and advise readers to await confirmation. No name, no detail.",
        deltas: { pressure: -20, suspicion: 0, fame: 0, credibility: 10 },
        outcome: "We were right — but nobody thanked us for it in November."
      }
    ]
  },

  // ── EVENT 9 ── Nov 18 07:00 ───────────────────────────────────────
  {
    id: "n18_0700",
    date: "PRAGUE — NOVEMBER 18, 1989 — 07:00",
    headline: "Government Claims Police Acted Legally",
    kicker: "The Interior Ministry's statement uses the word 'proportionate' four times.",
    body: "At seven in the morning the Interior Ministry releases its official account of the Národní events. The statement describes an 'unlawful assembly' dispersed by security forces 'with minimal force in proportion to the threat.' The word 'proportionate' appears four times. No injuries are acknowledged beyond 'minor'. No mention of hospitals.",
    choices: [
      {
        id: "refute_statement",
        label: "REFUTE LINE BY LINE",
        draft: "We print their statement in full and beneath each claim lay our documented evidence. Proportionate. Minimal. Read the wards.",
        deltas: { pressure: -50, suspicion: -40, fame: 10, credibility: -30 },
        outcome: "Refutation invited retaliation. The StB noted the comparison."
      },
      {
        id: "expose_contradiction",
        label: "PRINT THE CONTRADICTION",
        draft: "Their statement. Our hospital figures. Side by side, no further comment required.",
        deltas: { pressure: 5, suspicion: 5, fame: 20, credibility: 30 },
        outcome: "The juxtaposition did the work. Readers tore out the page and passed it on."
      },
      {
        id: "republish_official",
        label: "REPUBLISH OFFICIAL STATEMENT ONLY",
        draft: "We print the government's account in full without editorial comment.",
        deltas: { pressure: 0, suspicion: 0, fame: 0, credibility: 0 },
        outcome: "We printed the lie in good faith. Readers knew which kind of paper we were."
      }
    ]
  },

  // ── EVENT 10 ── Nov 18 09:00 ─────────────────────────────────────
  {
    id: "n18_0900",
    date: "PRAGUE — NOVEMBER 18, 1989 — 09:00",
    headline: "Flyers Spread Across The Universities",
    kicker: "The mimeographs have been running since midnight.",
    body: "By Saturday morning hand-printed flyers are appearing on noticeboards across Charles University, the Technical University, and the Academy of Arts. They describe Friday's events, name the hospitals, call for a student strike. The photocopier queues stretch into corridors. The StB is photographing noticeboards — but the flyers go up faster than they come down.",
    choices: [
      {
        id: "amplify_flyers",
        label: "AMPLIFY THE FLYERS",
        draft: "We reproduce the student statement in full and distribute with every copy of today's issue.",
        deltas: { pressure: 15, suspicion: 17, fame: 20, credibility: 10 },
        outcome: "Our distribution network carried the student statement beyond Prague to Brno and Plzeň."
      },
      {
        id: "report_strike_call",
        label: "REPORT THE STRIKE CALL",
        draft: "Students are calling for a strike. We report the call, the institutions involved, and await confirmation of numbers.",
        deltas: { pressure: 1, suspicion: 0, fame: 0, credibility: 20 },
        outcome: "The measured report held credibility for the longer campaign ahead."
      },
      {
        id: "warn_of_provocateurs",
        label: "WARN OF PROVOCATEURS",
        draft: "We advise caution — some flyers may be planted by StB to identify participants. Verify before acting.",
        deltas: { pressure: -30, suspicion: -20, fame: 10, credibility: -20 },
        outcome: "The warning was later proved partly correct — but it chilled momentum at a crucial hour."
      }
    ]
  },

  // ── EVENT 11 ── Nov 18 11:00 ─────────────────────────────────────
  {
    id: "n18_1100",
    date: "PRAGUE — NOVEMBER 18, 1989 — 11:00",
    headline: "Radio Free Europe Names Národní",
    kicker: "Munich's signal breaks through the jamming for eleven minutes.",
    body: "Radio Free Europe's Czech service broadcasts from Munich details of the Národní crackdown — injury counts, witness accounts, the Šmíd rumour. The signal is jammed intermittently, but listeners in Prague, Brno, and across Moravia catch enough. For many Czechoslovaks, foreign radio is the first trusted source. Our pages, in this light, become a written record of what the broadcasts could not hold.",
    choices: [
      {
        id: "partner_with_radio",
        label: "PUBLISH WHAT THE RADIO SAID",
        draft: "We transcribe what Radio Free Europe reported and anchor it to our own documentation. Two sources, one record.",
        deltas: { pressure: 18, suspicion: 17, fame: 20, credibility: 20 },
        outcome: "The transcript joined our pages into a chain of evidence reaching across borders."
      },
      {
        id: "distance_from_radio",
        label: "DISTANCE FROM FOREIGN BROADCASTS",
        draft: "We note RFE's broadcast but advise readers to seek domestic verification. Foreign sources carry their own politics.",
        deltas: { pressure: -20, suspicion: -10, fame: 10, credibility: -10 },
        outcome: "We seemed more cautious — and less committed — than the moment required."
      },
      {
        id: "ignore_radio",
        label: "IGNORE THE BROADCAST",
        draft: "We make no reference to foreign radio. Our authority rests on what we have witnessed ourselves.",
        deltas: { pressure: 0, suspicion: 0, fame: 0, credibility: 0 },
        outcome: "We missed a chance to tie domestic testimony to international record."
      }
    ]
  },

  // ── EVENT 12 ── Nov 18 14:00 ─────────────────────────────────────
  {
    id: "n18_1400",
    date: "PRAGUE — NOVEMBER 18, 1989 — 14:00",
    headline: "Theatres Strike, Students Occupy",
    kicker: "The actors close their houses. The faculties barricade their doors.",
    body: "Drama school students call a strike. DAMU and FAMU fill with mattresses and typewriters. Prague theatres — Realistic, Na zábradlí, Vinohrady — cancel their evening performances and read aloud the names of the beaten in place of the play. The actors' assembly votes a national strike of all theatres from Monday.",
    choices: [
      {
        id: "print_the_list",
        label: "PRINT THE LIST",
        draft: "Every name we have verified, the hospitals where they lie, the wards. Paste it on every tram stop in District 1.",
        deltas: { pressure: 15, suspicion: 11, fame: 20, credibility: 10 },
        outcome: "By dusk the list is in Brno, Bratislava, Plzeň."
      },
      {
        id: "interview_actors",
        label: "INTERVIEW THE ACTORS",
        draft: "Sit with the strikers in the Realistic. Let them speak as themselves, not as characters.",
        deltas: { pressure: 1, suspicion: 0, fame: 0, credibility: 10 },
        outcome: "Three actresses sent copy themselves, signed in full."
      },
      {
        id: "warn_theatres",
        label: "WARN — STRIKES MAY INVITE REPRISALS",
        draft: "We note the strikes with concern that cultural institutions risk losing state licences. Proceed with caution.",
        deltas: { pressure: -40, suspicion: -20, fame: 0, credibility: -20 },
        outcome: "We counselled caution to people who had already decided to be brave. They read other papers."
      }
    ]
  },

  // ── EVENT 13 ── Nov 18 18:00 ─────────────────────────────────────
  {
    id: "n18_1800",
    date: "PRAGUE — NOVEMBER 18, 1989 — 18:00",
    headline: "Prague Gathers In Corners And Doorways",
    kicker: "Small clusters form wherever people dare to stand still.",
    body: "Saturday evening and the city is restless. Around Wenceslas Square, in the lanes off Malá Strana, outside the National Theatre — small groups gather, speak quietly, disperse when uniforms appear, reform twenty metres away. Candles appear at the foot of the St Wenceslas statue. This is not yet a demonstration. It is the feeling before one.",
    choices: [
      {
        id: "document_the_mood",
        label: "DOCUMENT THE MOOD",
        draft: "We write the city as it stands tonight — the candles, the corners, the silence with something inside it.",
        deltas: { pressure: 21, suspicion: 22, fame: 20, credibility: 0 },
        outcome: "The piece was passed person to person as a kind of shared recognition."
      },
      {
        id: "observe_report",
        label: "OBSERVE AND REPORT",
        draft: "Small public gatherings around central Prague. Numbers modest. Police presence visible. Further developments anticipated.",
        deltas: { pressure: 2, suspicion: 1, fame: 0, credibility: 10 },
        outcome: "Sober. Accurate. Not the dispatch people needed on Saturday night."
      },
      {
        id: "stay_indoors",
        label: "STAY INDOORS — TOO RISKY",
        draft: "We publish nothing about public gatherings to avoid identifying participants to StB surveillance.",
        deltas: { pressure: -50, suspicion: -20, fame: 0, credibility: -20 },
        outcome: "We kept people safe — and kept ourselves irrelevant for another day."
      }
    ]
  },

  // ── EVENT 14 ── Nov 19 10:00 ─────────────────────────────────────
  {
    id: "n19_1000",
    date: "PRAGUE — NOVEMBER 19, 1989 — 10:00",
    headline: "Civic Forum Founded At The Činoherní Klub",
    kicker: "Havel, Dienstbier, Křižan — a coalition is born in a basement.",
    body: "In the smoke of the Činoherní Klub theatre basement, opposition writers, priests, and ex-Charter 77 signatories form Občanské fórum — Civic Forum. The founding statement demands resignation of those responsible for Friday's violence and the release of all political prisoners. Havel reads the text to a room of a hundred. Outside, the city is still waiting to learn that it has a programme.",
    attendance: 500,
    choices: [
      {
        id: "declare_the_forum",
        label: "DECLARE THE FORUM",
        draft: "Front page, masthead-width. Print their eight demands in full. This is no longer scattered grief — this is a programme.",
        deltas: { pressure: 65, suspicion: 33, fame: 40, credibility: 20 },
        outcome: "Forum chapters declared in fourteen cities within forty-eight hours."
      },
      {
        id: "publish_demands",
        label: "PUBLISH THE DEMANDS",
        draft: "No names, no faces. Just the demands. Let readers carry them home and decide for themselves.",
        deltas: { pressure: 3, suspicion: 2, fame: 10, credibility: 10 },
        outcome: "The demands are recited from the pulpit at Týn by Sunday."
      },
      {
        id: "run_as_brief",
        label: "RUN AS BACK-PAGE BRIEF",
        draft: "Three column inches, page four, under the weather. Let the StB underestimate them one more day.",
        deltas: { pressure: -60, suspicion: -30, fame: 10, credibility: -40 },
        outcome: "The Forum grew in the quiet. So did our irrelevance."
      }
    ]
  },

  // ── EVENT 15 ── Nov 19 13:00 ─────────────────────────────────────
  {
    id: "n19_1300",
    date: "PRAGUE — NOVEMBER 19, 1989 — 13:00",
    headline: "Dissidents Offer Exclusive Interviews",
    kicker: "Names that have not appeared in domestic print since 1977 are ready to speak.",
    body: "Three Civic Forum signatories approach our office — or what passes for it, a borrowed kitchen in Žižkov — and offer on-record interviews. They understand what is at stake. They have been waiting twenty years for a paper that would print their names without quotation marks around 'so-called dissident.' This is that moment, or it is not.",
    choices: [
      {
        id: "run_full_interviews",
        label: "RUN THE INTERVIEWS IN FULL",
        draft: "Three voices. Full names. Unedited. Let readers hear the people the regime has been erasing since the Normalisation.",
        deltas: { pressure: 18, suspicion: 22, fame: 30, credibility: 30 },
        outcome: "The interviews were read aloud in factories and reprinted in three samizdat papers."
      },
      {
        id: "run_excerpts",
        label: "RUN EXCERPTS WITH CONTEXT",
        draft: "Selected passages, with an editorial note placing the speakers in historical context for readers who do not know their names.",
        deltas: { pressure: 2, suspicion: 1, fame: 10, credibility: 0 },
        outcome: "The excerpts introduced new readers to figures they would soon see on television."
      },
      {
        id: "protect_sources",
        label: "PROTECT SOURCES — NAMES ONLY BY INITIAL",
        draft: "We print the substance of what they said, attributing quotes to initials only. Too dangerous for full names yet.",
        deltas: { pressure: -20, suspicion: 0, fame: 0, credibility: -10 },
        outcome: "Caution protected the speakers. It also made the piece unverifiable and easy to dismiss."
      }
    ]
  },

  // ── EVENT 16 ── Nov 19 17:00 ─────────────────────────────────────
  {
    id: "n19_1700",
    date: "PRAGUE — NOVEMBER 19, 1989 — 17:00",
    headline: "Student Strike Committees Link Nationally",
    kicker: "From Bratislava to Liberec, the phone lines are burning.",
    body: "Student strike committees have been forming at universities across the country since Saturday. Today they make contact with each other — by telephone, by courier, by students driving overnight in borrowed cars. A coordinating structure is taking shape that the government does not control and cannot yet fully surveil. The strike, if it comes, will be nationwide.",
    choices: [
      {
        id: "map_the_network",
        label: "MAP THE NETWORK",
        draft: "We print what we know of the committee structure — cities, institutions, contacts. A network in print is a network that holds.",
        deltas: { pressure: 24, suspicion: 28, fame: 20, credibility: 10 },
        outcome: "The map helped committees find each other. It also helped the StB find some of them."
      },
      {
        id: "announce_coordination",
        label: "ANNOUNCE COORDINATION WITHOUT DETAIL",
        draft: "Student bodies are coordinating nationally. We do not name individuals or institutions pending their security review.",
        deltas: { pressure: 2, suspicion: 1, fame: 0, credibility: 10 },
        outcome: "The announcement built momentum without exposing the structure."
      },
      {
        id: "stay_silent_strike",
        label: "STAY SILENT — PROTECT THE NETWORK",
        draft: "We know about the coordination. We print nothing. This information is too valuable to give to the wrong readers.",
        deltas: { pressure: -50, suspicion: -20, fame: 0, credibility: -20 },
        outcome: "We protected them — and removed ourselves from the story of how it happened."
      }
    ]
  },

  // ── EVENT 17 ── Nov 19 20:00 ─────────────────────────────────────
  {
    id: "n19_2000",
    date: "PRAGUE — NOVEMBER 19, 1989 — 20:00",
    headline: "Secret Police Increase Journalist Surveillance",
    kicker: "The StB has begun photographing faces outside the Realisti theatre.",
    body: "Word reaches us through a contact in the Interior Ministry: surveillance of known samizdat editors and correspondents has been intensified since Friday. Our Žižkov address may have been noted. Two colleagues have noticed the same car parked near their buildings on successive evenings. We are in the story now — and not as observers.",
    choices: [
      {
        id: "publish_surveillance_warning",
        label: "PUBLISH A SURVEILLANCE WARNING",
        draft: "We print a public notice: StB surveillance of journalists and correspondents has intensified. Readers should communicate securely.",
        deltas: { pressure: 15, suspicion: 33, fame: 0, credibility: 20 },
        outcome: "The warning spread through the network and tightened operational security across Prague."
      },
      {
        id: "move_quietly",
        label: "MOVE QUIETLY — CHANGE THE PRESS LOCATION",
        draft: "We say nothing in print. We move the mimeograph tonight. Security first, publication second.",
        deltas: { pressure: -20, suspicion: -40, fame: 10, credibility: 0 },
        outcome: "We survived the week. The next issue came from a different cellar."
      },
      {
        id: "keep_printing",
        label: "KEEP PRINTING — FEAR IS THE TOOL THEY USE",
        draft: "We acknowledge nothing. We print as before. Our only answer to surveillance is to be worth reading.",
        deltas: { pressure: -60, suspicion: -60, fame: 10, credibility: -30 },
        outcome: "The bravado was real. So was the knock on the door two days later."
      }
    ]
  },

  // ── EVENT 18 ── Nov 20 12:00 ─────────────────────────────────────
  {
    id: "n20_1200",
    date: "PRAGUE — NOVEMBER 20, 1989 — 12:00",
    headline: "Factory Workers Debate Joining The Streets",
    kicker: "In the ČKD canteen, the shift foreman has stopped talking.",
    body: "In the large factories of Prague's industrial east — ČKD in Vysočany, the Tatra works, the rail yards at Žižkov — workers are passing around flyers and arguing in cafeterias and locker rooms. The question is no longer whether the students are right. The question is whether a machinist from Holešovice has business in Wenceslas Square. Some are already walking.",
    choices: [
      {
        id: "call_on_workers",
        label: "CALL ON WORKERS TO JOIN",
        draft: "We print a direct call to Prague's industrial workforce: the students need you. The square needs you. Come.",
        deltas: { pressure: 21, suspicion: 22, fame: 20, credibility: 10 },
        outcome: "Workers from Vysočany were in the square by three o'clock."
      },
      {
        id: "report_worker_debate",
        label: "REPORT THE DEBATE",
        draft: "We describe what we heard in the canteens — no names, but the words are real. Let them decide.",
        deltas: { pressure: 2, suspicion: 0, fame: 0, credibility: 10 },
        outcome: "The canteen scene became one of our most-quoted pieces of the revolution."
      },
      {
        id: "warn_workers",
        label: "WARN WORKERS OF RISK",
        draft: "We note the demonstrations but advise industrial workers that participation may cost them their positions.",
        deltas: { pressure: -60, suspicion: -30, fame: 0, credibility: -20 },
        outcome: "The warning was received as cowardice by those who had already decided."
      }
    ]
  },

  // ── EVENT 19 ── Nov 20 16:00 ─────────────────────────────────────
  {
    id: "n20_1600",
    date: "PRAGUE — NOVEMBER 20, 1989 — 16:00",
    headline: "200,000 Fill Wenceslas Square",
    kicker: "The largest gathering since 1968. The square is one body.",
    body: "From the National Museum to Můstek, the square is shoulder-to-shoulder. Keys jangle across the whole width of the boulevard. 'Havel na Hrad' is heard as a mass chant for the first time, a sound that fills the space between the facades. Factory workers from Vysočany stand beside students from Malá Strana. The Letná plateau is whispered as the next stage.",
    attendance: 100000,
    choices: [
      {
        id: "publish_aerial_count",
        label: "PUBLISH THE AERIAL COUNT",
        draft: "We borrow the architect's roof on Vodičkova, count by grid, and print the number — 200,000 — in 96-point above the fold.",
        deltas: { pressure: 117, suspicion: 55, fame: 50, credibility: 20 },
        outcome: "Rudé Právo said 30,000. Nobody believed them anymore."
      },
      {
        id: "twenty_voices",
        label: "TWENTY VOICES FROM THE SQUARE",
        draft: "A pensioner. A welder. A nun. A soldier on leave. Twenty paragraphs, twenty names.",
        deltas: { pressure: 6, suspicion: 3, fame: 20, credibility: 10 },
        outcome: "The welder from Kladno became a household name by Friday."
      },
      {
        id: "compare_1968",
        label: "HOLD — NUMBERS UNVERIFIED",
        draft: "We report a major demonstration in Wenceslas Square and await confirmed crowd estimates before publishing figures.",
        deltas: { pressure: -100, suspicion: -40, fame: 0, credibility: -30 },
        outcome: "We held. The square filled without our record of it."
      }
    ]
  },

  // ── EVENT 20 ── Nov 20 18:00 ─────────────────────────────────────
  {
    id: "n20_1800",
    date: "PRAGUE — NOVEMBER 20, 1989 — 18:00",
    headline: "Keys Ring From Můstek To The Museum",
    kicker: "A sound no baton can silence.",
    body: "As the afternoon demonstration continues into evening, something spreads through the crowd that no organiser planned: the jingling of keys. Thousands of key-rings raised above the crowd, the sound rolling like bells from the lower square to the museum steps. It is the sound of doors. Of opening. Of a country rattling its chains loose.",
    choices: [
      {
        id: "write_the_keys",
        label: "WRITE THE KEYS",
        draft: "We write the scene: the keys, the sound, what it meant to stand in it. Some moments need prose, not numbers.",
        deltas: { pressure: 12, suspicion: 0, fame: 20, credibility: 10 },
        outcome: "The piece was read on Radio Free Europe three days later."
      },
      {
        id: "photograph_moment",
        label: "HOLD FOR TOMORROW — BIGGER STORY COMING",
        draft: "We note the key gesture briefly and reserve the front page for what the general strike may bring.",
        deltas: { pressure: -30, suspicion: 0, fame: 0, credibility: -20 },
        outcome: "We saved space for a story that wasn't ready. The keys deserved their own page."
      },
      {
        id: "dismiss_symbolism",
        label: "NOTE AS CROWD SYMBOL ONLY",
        draft: "Participants used key-jangling as a crowd signal. No further significance attributed.",
        deltas: { pressure: 0, suspicion: 0, fame: 0, credibility: 0 },
        outcome: "We described it correctly and missed it entirely."
      }
    ]
  },

  // ── EVENT 21 ── Nov 20 22:00 ─────────────────────────────────────
  {
    id: "n20_2200",
    date: "PRAGUE — NOVEMBER 20, 1989 — 22:00",
    headline: "Government Debates Stronger Suppression",
    kicker: "Reports from the Party's emergency session have begun to leak.",
    body: "By late Monday evening reports reach us through contacts inside the Party apparatus: the Politburo is meeting in emergency session. The hard-line faction is urging a crackdown modelled on Tiananmen, four months ago. A second faction argues that the army will not comply. The debate is not resolved. The city sleeps uneasily, not knowing which faction will have won by morning.",
    choices: [
      {
        id: "publish_leak",
        label: "PUBLISH THE LEAK",
        draft: "We print what we have heard: a faction wants a crackdown. The army is not certain to comply. Readers must know the stakes.",
        deltas: { pressure: 21, suspicion: 28, fame: 20, credibility: 20 },
        outcome: "The leak stiffened the crowd's resolve — and reached the army before the order did."
      },
      {
        id: "protect_source",
        label: "PROTECT THE SOURCE — HOLD IT",
        draft: "We know what is being discussed. We print nothing. Our source's life is worth more than tomorrow's dispatch.",
        deltas: { pressure: -10, suspicion: -20, fame: 0, credibility: 0 },
        outcome: "The source survived. So did the revolution, by other means."
      },
      {
        id: "reassure_readers",
        label: "REASSURE READERS — NO CRACKDOWN IMMINENT",
        draft: "We advise calm. Reports of a government crackdown are unconfirmed. Citizens should continue peaceful assembly.",
        deltas: { pressure: -50, suspicion: -40, fame: 0, credibility: -20 },
        outcome: "We reassured when we should have warned. Credibility recovered slowly."
      }
    ]
  },

  // ── EVENT 22 ── Nov 21 09:00 ─────────────────────────────────────
  {
    id: "n21_0900",
    date: "PRAGUE — NOVEMBER 21, 1989 — 09:00",
    headline: "Independent Papers Back The Demonstrations",
    kicker: "The underground press finds its moment.",
    body: "By Tuesday morning a dozen samizdat and semi-official independent publications have printed statements of solidarity with the demonstrations. Some have been running since the Charter 77 years. Others were founded last week in borrowed kitchens. Together, and for the first time, they make something that resembles a free press — distributed by bicycle, left in church porches, and passed across café tables.",
    choices: [
      {
        id: "joint_statement",
        label: "SIGN THE JOINT STATEMENT",
        draft: "We add our name to the declaration of the independent press. Twelve papers, one voice, published simultaneously.",
        deltas: { pressure: 18, suspicion: 17, fame: 40, credibility: 20 },
        outcome: "The joint declaration was reprinted in every major Western newspaper within forty-eight hours."
      },
      {
        id: "note_solidarity",
        label: "NOTE THE SOLIDARITY",
        draft: "We report the solidarity of independent publications without joining any formal declaration.",
        deltas: { pressure: 0, suspicion: 0, fame: 0, credibility: 10 },
        outcome: "We kept our independence at the cost of being absent from the record."
      },
      {
        id: "stay_separate",
        label: "STAY SEPARATE — INDEPENDENCE IS OUR VALUE",
        draft: "We do not sign statements. We report facts. Other papers speak for themselves.",
        deltas: { pressure: -40, suspicion: 0, fame: 10, credibility: -20 },
        outcome: "Principled. Also lonely. Also wrong for this particular morning."
      }
    ]
  },

  // ── EVENT 23 ── Nov 21 15:00 ─────────────────────────────────────
  {
    id: "n21_1500",
    date: "PRAGUE — NOVEMBER 21, 1989 — 15:00",
    headline: "Wenceslas Square Swells To Two Hundred Thousand",
    kicker: "Dubček speaks. The city hears the word it has not heard for twenty-one years.",
    body: "Alexander Dubček — Prague Spring, 1968, twenty-one years of silence — appears on the balcony of the Melantrich publishing house on Wenceslas Square. The crowd below is 200,000 strong and still growing. When he says 'Nechajte nás žiť' — let us live — the sound that comes back from the crowd is not a chant. It is something older.",
    attendance: 200000,
    choices: [
      {
        id: "lead_with_dubcek",
        label: "LEAD WITH DUBČEK",
        draft: "We put his name in the headline and his words on the front page. Twenty-one years of silence, ended on a balcony.",
        deltas: { pressure: 130, suspicion: 61, fame: 60, credibility: 20 },
        outcome: "The Dubček issue sold out before dusk. People kept the page."
      },
      {
        id: "cover_the_crowd",
        label: "COVER THE CROWD AND THE SPEECH",
        draft: "Two hundred thousand people and the man they came to hear. We give both equal weight.",
        deltas: { pressure: 6, suspicion: 3, fame: 20, credibility: 10 },
        outcome: "The balanced coverage found readers who needed to understand the full scene."
      },
      {
        id: "downplay_dubcek",
        label: "DOWNPLAY DUBČEK — TOO PROVOCATIVE",
        draft: "We note a former public official addressed the crowd. We do not print his name.",
        deltas: { pressure: -120, suspicion: -50, fame: 0, credibility: -30 },
        outcome: "We erased the man who gave the crowd its voice. The crowd gave him back without us."
      }
    ]
  },

  // ── EVENT 24 ── Nov 21 19:00 ─────────────────────────────────────
  {
    id: "n21_1900",
    date: "PRAGUE — NOVEMBER 21, 1989 — 19:00",
    headline: "Foreign Press Amplifies The Revolution",
    kicker: "The world is watching. What it sees depends partly on what we have printed.",
    body: "The BBC, Reuters, AP, and Austrian television are filing from Prague. Their reports cite 'underground publications' and 'samizdat sources' without naming us. A Western correspondent stops our editor outside the Melantrich building and asks for a copy of whatever we have in print. The international gaze is both protection and pressure.",
    choices: [
      {
        id: "provide_press_access",
        label: "PROVIDE ACCESS TO FOREIGN PRESS",
        draft: "We give the correspondent everything we have in print and on file. International attention is armour.",
        deltas: { pressure: 18, suspicion: 17, fame: 30, credibility: 10 },
        outcome: "Our documentation was cited in the International Herald Tribune by Thursday."
      },
      {
        id: "decline_foreign_press",
        label: "DECLINE — FOREIGN ATTENTION IS A RISK",
        draft: "We decline comment to the foreign press. International amplification may provoke the hardliners further.",
        deltas: { pressure: -40, suspicion: -20, fame: 0, credibility: -20 },
        outcome: "We stayed safe. We also stayed small in a moment when we could have grown."
      },
      {
        id: "ignore_foreign_press",
        label: "IGNORE AND CONTINUE PUBLISHING",
        draft: "We note international media presence but make no changes to our publication. Our readers are in Prague.",
        deltas: { pressure: 0, suspicion: 0, fame: 0, credibility: 0 },
        outcome: "We published. The foreign press found someone else to quote."
      }
    ]
  },

  // ── EVENT 25 ── Nov 22 08:00 ─────────────────────────────────────
  {
    id: "n22_0800",
    date: "PRAGUE — NOVEMBER 22, 1989 — 08:00",
    headline: "Universities Formally Declare Strike",
    kicker: "Rectors and deans step aside. Students hold the buildings.",
    body: "By Wednesday morning the decision is official: Charles University, the Technical University, the Academy of Fine Arts, and twelve other Prague institutions have formally declared strike action. Student committees have taken over the administration of lecture halls. Some professors join the strike pickets in their academic robes. The State has lost the universities.",
    choices: [
      {
        id: "print_strike_declaration",
        label: "PRINT THE DECLARATIONS",
        draft: "We publish the full text of the strike declarations from each institution. Let it stand as a document of what happened here.",
        deltas: { pressure: 24, suspicion: 22, fame: 20, credibility: 10 },
        outcome: "The declarations became the formal record — referenced in the parliamentary hearings of 1990."
      },
      {
        id: "report_strike",
        label: "REPORT THE STRIKE",
        draft: "Universities on strike. We describe the scale, the institutions, the student committees. Full documentation follows.",
        deltas: { pressure: 2, suspicion: 0, fame: 0, credibility: 10 },
        outcome: "Clean reporting that held its credibility through the days that followed."
      },
      {
        id: "urge_return",
        label: "URGE CAUTION — STUDENTS SHOULD RETURN TO STUDIES",
        draft: "We express concern that prolonged strike action risks academic futures and advise students to consider returning to classes.",
        deltas: { pressure: -50, suspicion: -20, fame: 0, credibility: -20 },
        outcome: "The students did not return to classes. We were not quoted approvingly by any of them."
      }
    ]
  },

  // ── EVENT 26 ── Nov 22 14:00 ─────────────────────────────────────
  {
    id: "n22_1400",
    date: "PRAGUE — NOVEMBER 22, 1989 — 14:00",
    headline: "Worker Unions Begin Strike Talks",
    kicker: "The revolution crosses the river from Malá Strana to the factory floor.",
    body: "Representatives of the official trade unions — the ROH — meet in extraordinary session in a Prague trade union hall. The agenda, never before on any ROH agenda: whether to call a general strike. Individual factory committees in Kladno, Ostrava, and across northern Bohemia have already voted to join. The official bodies are running to catch up with their own members.",
    choices: [
      {
        id: "call_general_strike",
        label: "CALL FOR THE GENERAL STRIKE",
        draft: "We print a direct call: the conditions for a general strike are met. Workers should demand their committees act.",
        deltas: { pressure: 27, suspicion: 28, fame: 20, credibility: 10 },
        outcome: "The call was read into the ROH meeting by a delegate who brought our page."
      },
      {
        id: "report_union_talks",
        label: "REPORT THE UNION TALKS",
        draft: "We cover the ROH session and the factory votes without editorial pressure on the outcome.",
        deltas: { pressure: 1, suspicion: 0, fame: 0, credibility: 10 },
        outcome: "Accurate. Fair. Less useful than the moment required."
      },
      {
        id: "warn_strike_risk",
        label: "WARN — GENERAL STRIKE RISKS ECONOMIC COLLAPSE",
        draft: "We note the economic risk of a nationwide stoppage and advise targeted rather than general action.",
        deltas: { pressure: -60, suspicion: -20, fame: 0, credibility: -20 },
        outcome: "The workers struck anyway. They remembered we had counselled against it."
      }
    ]
  },

  // ── EVENT 27 ── Nov 22 18:00 ─────────────────────────────────────
  {
    id: "n22_1800",
    date: "PRAGUE — NOVEMBER 22, 1989 — 18:00",
    headline: "Evening Rally Fills The Square Again",
    kicker: "Two hundred and fifty thousand. The numbers no longer surprise anyone.",
    body: "Wednesday evening and the demonstration in Wenceslas Square has grown again — 250,000 by credible estimate, larger than Monday, larger than Tuesday. Bratislava is reporting 100,000 at SNP Square. Brno, Liberec, Plzeň. The revolution is no longer a Prague story.",
    attendance: 250000,
    choices: [
      {
        id: "map_national_spread",
        label: "MAP THE NATIONAL SPREAD",
        draft: "We print a city-by-city count. Prague, Bratislava, Brno, Plzeň, Liberec, Ostrava. This is not a Prague story anymore.",
        deltas: { pressure: 104, suspicion: 44, fame: 40, credibility: 10 },
        outcome: "The national map was pinned to factory doors and university boards across the country."
      },
      {
        id: "document_prague",
        label: "DOCUMENT PRAGUE IN DEPTH",
        draft: "We stay with what we can verify: Wenceslas Square, 250,000, the speeches, the crowd. Our city, our testimony.",
        deltas: { pressure: 5, suspicion: 2, fame: 20, credibility: 10 },
        outcome: "Deep documentation of Prague became the record cities outside the capital quoted."
      },
      {
        id: "hold_for_numbers",
        label: "HOLD — NATIONAL NUMBERS UNVERIFIED",
        draft: "We report Prague only. National figures require verification we cannot provide tonight.",
        deltas: { pressure: -100, suspicion: -40, fame: 0, credibility: -30 },
        outcome: "We were accurate. We were also not where the story was."
      }
    ]
  },

  // ── EVENT 28 ── Nov 24 11:00 ─────────────────────────────────────
  {
    id: "n24_1100",
    date: "PRAGUE — NOVEMBER 24, 1989 — 11:00",
    headline: "Jakeš And The Politburo Resign",
    kicker: "Miloš Jakeš reads his resignation at eleven. The typesetters stop the press.",
    body: "At eleven o'clock Friday morning, General Secretary Miloš Jakeš announces the resignation of the entire Politburo. He reads from a prepared text in a voice that has misread the room for twenty years. In the square below the Melantrich balcony, 300,000 people receive the news in silence and then in noise that carries to the river.",
    attendance: 300000,
    choices: [
      {
        id: "stop_the_press",
        label: "STOP THE PRESS — REPRINT EVERYTHING",
        draft: "We pull the morning run, reset the front page, and print one word above the fold: PADLI. They fell.",
        deltas: { pressure: 91, suspicion: 33, fame: 50, credibility: 10 },
        outcome: "PADLI sold out by noon. The word was chalked on walls from Vinohrady to Holešovice."
      },
      {
        id: "full_report_resignations",
        label: "FULL REPORT WITH CONTEXT",
        draft: "Jakeš and the Politburo have resigned. We print the full statement, the names, and what comes next.",
        deltas: { pressure: 4, suspicion: 1, fame: 0, credibility: 10 },
        outcome: "The careful record became the reference version when the archives opened."
      },
      {
        id: "await_successor",
        label: "HOLD — AWAIT THE SUCCESSOR",
        draft: "Resignations without a successor announcement do not constitute a transfer of power. We hold until the picture is complete.",
        deltas: { pressure: -70, suspicion: -40, fame: 0, credibility: -20 },
        outcome: "We waited for completeness. The city did not."
      }
    ]
  },

  // ── EVENT 29 ── Nov 24 15:00 ─────────────────────────────────────
  {
    id: "n24_1500",
    date: "PRAGUE — NOVEMBER 24, 1989 — 15:00",
    headline: "Prague Celebrates — Cautiously",
    kicker: "Joy on the square, but the question of what comes next hangs above the cobblestones.",
    body: "The afternoon after the Politburo resignation is strange in the way of moments between one era and the next. People embrace in the square. Candles are brought to the Wenceslas statue. Someone puts flowers on the pavement where the batons fell on November 17. But Civic Forum's leaders are already meeting: the new general secretary is Urbánek, a name that satisfies no one.",
    choices: [
      {
        id: "celebrate_cautiously",
        label: "CELEBRATE — BUT NOTE WHAT REMAINS",
        draft: "The Politburo has fallen. We celebrate. We also remind readers that Urbánek's appointment changes nothing structural.",
        deltas: { pressure: 21, suspicion: 11, fame: 30, credibility: 10 },
        outcome: "The dispatch caught the precise mood — joy without illusion — and was widely passed around."
      },
      {
        id: "declare_victory",
        label: "DECLARE VICTORY",
        draft: "It is done. We print the word that has waited since 1968: svoboda.",
        deltas: { pressure: 2, suspicion: 0, fame: 10, credibility: 0 },
        outcome: "The declaration was premature. Urbánek was still in the building. Readers noted the error."
      },
      {
        id: "warn_incomplete",
        label: "WARN — STRUCTURAL POWER UNCHANGED",
        draft: "The Politburo resigned. The Party still governs. The army is still armed. Nothing is over.",
        deltas: { pressure: -40, suspicion: -20, fame: 0, credibility: -10 },
        outcome: "Accurate and necessary — but celebrated by nobody on a day people needed to feel something."
      }
    ]
  },

  // ── EVENT 30 ── Nov 24 21:00 ─────────────────────────────────────
  {
    id: "n24_2100",
    date: "PRAGUE — NOVEMBER 24, 1989 — 21:00",
    headline: "Government Broadcasts Reform Promises",
    kicker: "Urbánek reads from a text that sounds, for the first time, like something other than a threat.",
    body: "Friday evening, Czechoslovak Television broadcasts a statement from the new general secretary. Urbánek promises free elections, dialogue with Civic Forum, and an investigation into November 17. The language has changed. Everything else remains unclear. Civic Forum's team watches in the theatre basement and debates whether to respond, accept, or wait.",
    choices: [
      {
        id: "reject_promises",
        label: "REJECT THE PROMISES AS THEATRE",
        draft: "We print the broadcast and note, line by line, what has been promised before and never delivered.",
        deltas: { pressure: -20, suspicion: -20, fame: 10, credibility: 0 },
        outcome: "The sceptical reading proved partly right — but it anticipated cynicism the crowd was not yet ready for."
      },
      {
        id: "analyse_promises",
        label: "ANALYSE THE PROMISES",
        draft: "What is said. What is not said. What 'free elections' means without a timeline. What 'investigation' means without independence. We give readers the tools to read it themselves.",
        deltas: { pressure: 3, suspicion: 3, fame: 0, credibility: 20 },
        outcome: "The analytical piece was passed among Civic Forum's working groups as a reading guide."
      },
      {
        id: "welcome_promises",
        label: "WELCOME THE PROMISES",
        draft: "The government has offered dialogue and elections. We welcome this and urge Civic Forum to negotiate in good faith.",
        deltas: { pressure: 2, suspicion: 4, fame: 0, credibility: 10 },
        outcome: "The welcoming tone earned us few readers — and puzzled those we had."
      }
    ]
  },

  // ── EVENT 31 ── Nov 26 13:00 ─────────────────────────────────────
  {
    id: "n26_1300",
    date: "PRAGUE — NOVEMBER 26, 1989 — 13:00",
    headline: "Seven Hundred Fifty Thousand At Letná Plain",
    kicker: "The largest demonstration in Czech history. Havel and Dubček on one platform.",
    body: "The Letná plateau above Prague holds three-quarters of a million people. Václav Havel and Alexander Dubček stand on the same stage for the first time. The metronome at the top of the hill stands idle — time has stopped by another mechanism today. Looking down on the city from the crowd, one can see the rooftops of the old town spread beneath the winter sky, and above them, the castle.",
    attendance: 750000,
    choices: [
      {
        id: "document_letna",
        label: "DOCUMENT LETNÁ FOR HISTORY",
        draft: "We write the dispatch as if future historians will read it — because they will. Every detail. Every name on the platform.",
        deltas: { pressure: 163, suspicion: 66, fame: 70, credibility: 20 },
        outcome: "The Letná dispatch was cited by name in four subsequent histories of the Velvet Revolution."
      },
      {
        id: "report_the_numbers",
        label: "REPORT THE NUMBERS AND THE SPEECHES",
        draft: "Seven hundred and fifty thousand. We give the crowd count and the main speeches in full. The record speaks.",
        deltas: { pressure: 8, suspicion: 4, fame: 30, credibility: 10 },
        outcome: "The numbers report became the factual record — copied into archives without error."
      },
      {
        id: "hold_letna",
        label: "HOLD — TOO VISIBLE TO COVER PUBLICLY",
        draft: "We do not publish a Letná report. The crowd is too large; the StB will note every paper in it.",
        deltas: { pressure: -150, suspicion: -60, fame: 0, credibility: -40 },
        outcome: "We were invisible at the largest gathering in Czech history. Readers found other papers."
      }
    ]
  },

  // ── EVENT 32 ── Nov 27 12:00 ─────────────────────────────────────
  {
    id: "n27_1200",
    date: "PRAGUE — NOVEMBER 27, 1989 — 12:00",
    headline: "Nationwide General Strike Begins",
    kicker: "At noon, the country stops.",
    body: "At twelve o'clock on Monday the 27th, the two-hour general strike begins. Factories go quiet. Trams stop in the middle of streets. Hospital staff stand in the corridors rather than the wards. The participation rate across the country is later estimated at seventy-five percent — the largest coordinated civil action in Czechoslovak history. Even in small Moravian towns where the word 'strike' has not been said aloud in forty years.",
    attendance: 2000000,
    choices: [
      {
        id: "lead_strike_edition",
        label: "LEAD THE STRIKE EDITION",
        draft: "We print a special edition: the strike is real, the numbers are real, the country has spoken. This is the moment everything was building toward.",
        deltas: { pressure: 195, suspicion: 83, fame: 80, credibility: 20 },
        outcome: "The strike edition was our largest print run. Copies were carried from Prague to the Tatra mountains."
      },
      {
        id: "document_strike",
        label: "DOCUMENT THE STRIKE CITY BY CITY",
        draft: "We print a city-by-city account of which industries have stopped, which are still running, what the participation rate is.",
        deltas: { pressure: 9, suspicion: 5, fame: 20, credibility: 10 },
        outcome: "The documentation became the factual basis for post-revolution court proceedings."
      },
      {
        id: "wait_for_outcome",
        label: "WAIT — PUBLISH WHEN WE KNOW THE OUTCOME",
        draft: "We do not publish until we can report whether the strike succeeded. Incomplete reports serve no one.",
        deltas: { pressure: -180, suspicion: -70, fame: 0, credibility: -50 },
        outcome: "We waited for completeness and missed the event entirely."
      }
    ]
  },

  // ── EVENT 33 ── Nov 27 14:00 ─────────────────────────────────────
  {
    id: "n27_1400",
    date: "PRAGUE — NOVEMBER 27, 1989 — 14:00",
    headline: "Strike Halts The Country",
    kicker: "The two hours are up. The regime knows what it is facing.",
    body: "At two o'clock the strike ends, as planned. The factories restart. The trams move. But the two hours of silence have said what no speech could. In the afternoon Civic Forum's negotiators arrive at government offices for the first formal dialogue. The regime's negotiators look like men who have already reached a private conclusion.",
    choices: [
      {
        id: "publish_strike_success",
        label: "PUBLISH THE RESULT",
        draft: "The strike held. Seventy-five percent. We print the number and the meaning: this government has lost its country.",
        deltas: { pressure: 36, suspicion: 22, fame: 40, credibility: 10 },
        outcome: "The strike result page became the most-photocopied document of the revolution."
      },
      {
        id: "report_negotiations",
        label: "REPORT THE NEGOTIATIONS",
        draft: "Strike complete. Civic Forum in dialogue with government. We cover the afternoon talks and what was said.",
        deltas: { pressure: 2, suspicion: 0, fame: 0, credibility: 10 },
        outcome: "The negotiation coverage gave readers the full picture as it unfolded."
      },
      {
        id: "minimise_strike",
        label: "MINIMISE — NOTE AS SYMBOLIC ACTION",
        draft: "A two-hour work stoppage was observed in some industries. The practical impact is limited.",
        deltas: { pressure: -80, suspicion: -30, fame: 0, credibility: -30 },
        outcome: "We called a revolution symbolic. We were not forgiven for this for years."
      }
    ]
  },

  // ── EVENT 34 ── Dec 10 16:00 ─────────────────────────────────────
  {
    id: "d10_1600",
    date: "PRAGUE — DECEMBER 10, 1989 — 16:00",
    headline: "Government Of National Understanding Formed",
    kicker: "Čalfa is prime minister. The cabinet is not majority communist. Say that again.",
    body: "On International Human Rights Day, President Husák swears in a new government of 'National Understanding' under Prime Minister Marián Čalfa. For the first time since 1948, communists do not hold a majority of cabinet posts. Husák resigns the presidency immediately after the ceremony. The room where this happens is the same room where the purges of the Normalisation were administered.",
    attendance: 500000,
    choices: [
      {
        id: "mark_the_date",
        label: "MARK THE DATE",
        draft: "December 10, 1948 is when the Communists consolidated control. December 10, 1989 is when they did not.",
        deltas: { pressure: 65, suspicion: 11, fame: 50, credibility: 20 },
        outcome: "The date comparison became the phrase repeated on radio for a week."
      },
      {
        id: "report_cabinet",
        label: "REPORT THE CABINET",
        draft: "We list the ministers, their portfolios, their affiliations. Čalfa. The non-communist majority. The facts, clearly stated.",
        deltas: { pressure: 3, suspicion: 0, fame: 0, credibility: 10 },
        outcome: "The factual record served readers who needed to know who now governed them."
      },
      {
        id: "warn_insufficient",
        label: "WARN — THIS IS INSUFFICIENT",
        draft: "A mixed cabinet under a communist prime minister does not constitute the free government the streets demanded.",
        deltas: { pressure: -100, suspicion: 0, fame: 10, credibility: -50 },
        outcome: "The warning was right in part. It was also not what the country needed to hear on December 10th."
      }
    ]
  },

  // ── EVENT 35 ── Dec 29 17:00 ─────────────────────────────────────
  {
    id: "d29_1700",
    date: "PRAGUE — DECEMBER 29, 1989 — 17:00",
    headline: "Havel Elected President",
    kicker: "The Federal Assembly names its choice unanimously. The castle receives its playwright.",
    body: "At five o'clock on December 29th, the Federal Assembly elects Václav Havel president of Czechoslovakia by unanimous vote. He is the first non-communist head of state since before 1948. The announcement is heard on televisions in apartments, on radios held to ears in squares, and in the print shop where our last issue of the revolution was set in type and is now running off the mimeograph.",
    attendance: 300000,
    choices: [
      {
        id: "run_the_headline",
        label: "RUN THE HEADLINE",
        draft: "One word. Across the full width of the front page. HAVEL. Then: President of Czechoslovakia. December 29, 1989.",
        deltas: { pressure: 98, suspicion: 0, fame: 50, credibility: 30 },
        outcome: "The single-word issue sold out by nine in the morning. Copies were framed."
      },
      {
        id: "document_the_vote",
        label: "DOCUMENT THE VOTE",
        draft: "The Federal Assembly. Unanimous. His name, his background, his journey from Charter 77 signatory to head of state. The full record.",
        deltas: { pressure: 0, suspicion: 0, fame: 40, credibility: 20 },
        outcome: "The documented record became the version cited in parliamentary histories."
      },
      {
        id: "note_the_limits",
        label: "NOTE THE LIMITS OF THE PRESIDENCY",
        draft: "Havel is president, but free elections have not yet been held and the communist apparatus retains significant institutional power.",
        deltas: { pressure: -120, suspicion: 0, fame: 10, credibility: -60 },
        outcome: "Accurate. Also the wrong dispatch for the last day of the revolution."
      }
    ]
  }
];
