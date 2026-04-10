import React, { useState, useRef } from "react";

// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (connect your Gmail/etc) → copy the Service ID
// 3. Create an Email Template with these variables:
//    {{to_email}}, {{visitor_name}}, {{reply_message}}, {{original_message}}
//    Copy the Template ID
// 4. Go to Account → copy your Public Key
// Then replace the three values below:
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

function sendReplyEmail(params) {
  return fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        to_email: params.toEmail,
        visitor_name: params.visitorName,
        reply_message: params.replyMessage,
        original_message: params.originalMessage,
      },
    }),
  })
    .then(function (res) {
      return res.ok;
    })
    .catch(function () {
      return false;
    });
}

const MIKKI_BIRTHDAY = new Date(2018, 3, 18); // April 18, 2018

function getMikkiAge() {
  const today = new Date();
  let years = today.getFullYear() - MIKKI_BIRTHDAY.getFullYear();
  let months = today.getMonth() - MIKKI_BIRTHDAY.getMonth();
  let days = today.getDate() - MIKKI_BIRTHDAY.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return years + " years, " + months + " months & " + days + " days old";
}

const PRESET_TAGS = [
  "Current Mood: Zoomies 🌀",
  "Current Mood: Judgemental 😒",
  "Current Mood: Betrayed 😤",
  "Current Mood: Nap Mode 💤",
  "Current Mood: Hungry 🍖",
  "Target: The Mailman 📬",
  "Target: That One Squirrel 🐿️",
  "Target: The Vacuum 🌀",
  "Target: Neighbour's Cat 🐱",
  "Status: Investigating 🔍",
  "Status: Shedding (intentionally) 🐾",
  "Status: Napping (on duty) 💤",
  "Alert: Doorbell Detected 🔔",
  "Alert: Suspicious Smell 👃",
  "Alert: Someone Said 'Walk' 🦮",
];

const initialEntries = [
  // 2024
  {
    id: 101,
    year: 2024,
    date: "March 3, 2024",
    title: "They put me on a DIET",
    mood: "Betrayed 😤",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Current Mood: Betrayed 😤", "Target: The Mailman 📬"],
    contentProfessional: null,
    content:
      'Hello. My name is Mikki. I am 7 years, 11 months, and 14 days old. I am fluffy, I am wise, and today I have been wronged.\n\nThe humans — whom I have generously allowed to live with me — have dec.ided that I am "a little chonky." CHONKY. I prefer the term "volumetrically gifted." I am not overweight. I am full of thoughts. My thoughts are heavy.\n\nThey gave me LESS kibble today. I stared at the bowl for 4 minutes straight. Then I stared at them. They did not crack. My powers are weakening. This is a crisis.\n\nI did not forgive them. I will not forgive them. (I forgave them when they brought out the treat bag but I made my face look VERY neutral so they wouldn\'t know.)',
  },
  {
    id: 102,
    year: 2024,
    date: "March 10, 2024",
    title: "The Vacuum Attacked First",
    mood: "Victorious 🏆",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Target: The Vacuum 🌀", "Status: Investigating 🔍"],
    contentProfessional: null,
    content:
      "Let the record show: I, Mikki, did NOT run from the vacuum today.\n\nOkay. I ran a little. But it was a TACTICAL retreat. I assessed the situation from the top of the stairs, gathered intelligence, and returned when the threat was neutralized (unplugged).\n\nAfter the battle, I sat in the middle of the freshly vacuumed rug and shed aggressively. Take that, clean floor. Take. That.",
  },
  {
    id: 103,
    year: 2024,
    date: "March 28, 2024",
    title: "I Discovered a Suspicious Smell",
    mood: "Investigative 🔍",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Alert: Suspicious Smell 👃", "Status: Investigating 🔍"],
    contentProfessional: null,
    content:
      "There is a smell outside near the big tree. I cannot identify it. This is unacceptable.\n\nI sniffed it for 11 minutes. The human kept saying \"come on Mikki, let's go.\" I did not let's go.\n\nUPDATE: I went back the next day. The smell was gone. Whoever you are — I respect you.",
  },
  // 2023
  {
    id: 201,
    year: 2023,
    date: "January 5, 2023",
    title: "New Year, Same Me",
    mood: "Suspicious 🤨",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Current Mood: Judgemental 😒"],
    contentProfessional: null,
    content:
      'The humans keep saying "new year, new me." I do not understand this concept. I am Mikki. I was Mikki last year. I will be Mikki next year. I see no room for improvement.\n\nThey also bought a new dog bed. I have not dec.ided if I like it yet. I sat next to it for two hours. That is not the same as approval.',
  },
  {
    id: 202,
    year: 2023,
    date: "June 18, 2023",
    title: "A Child Tried to Hug Me",
    mood: "Dramatic 🎭",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Alert: Doorbell Detected 🔔", "Current Mood: Betrayed 😤"],
    contentProfessional: null,
    content:
      'A small human came to the house today. It was loud and smelled like juice. It looked at me with huge eyes and said "DOGGY."\n\nI am not "doggy." I am Mikki. I am a proud Shiba Inu with seven years of life experience.\n\nIt grabbed my ear. I gave it the stare. It giggled. My stare has no effect on beings under 90cm. This is a known weakness I am working on.',
  },
  {
    id: 203,
    year: 2023,
    date: "November 2, 2023",
    title: "The Vet. Again.",
    mood: "Betrayed 😤",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Current Mood: Betrayed 😤", "Status: Investigating 🔍"],
    contentProfessional: null,
    content:
      'They said we were going for a "drive." I like drives. I was excited. My tail moved.\n\nIt was the vet.\n\nI sat perfectly still while they did the things they do. I did not make a sound. I was dignified. I was professional. And then on the way home I stared out the window for 45 minutes without blinking once.\n\nLet them feel it.',
  },
  // 2022
  {
    id: 301,
    year: 2022,
    date: "February 14, 2022",
    title: "Valentine's Day is a Scam",
    mood: "Suspicious 🤨",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Current Mood: Judgemental 😒"],
    contentProfessional: null,
    content:
      'The humans gave each other chocolates today. I was not given chocolates. I was told chocolates are "toxic for dogs." This is very convenient for the humans.\n\nI received a single treat. ONE. It was shaped like a heart. I ate it in 0.3 seconds and then stared at them until they felt bad. They gave me another one. I ate that in 0.2 seconds. Progress.',
  },
  {
    id: 302,
    year: 2022,
    date: "July 4, 2022",
    title: "The Sky is Under Attack",
    mood: "Chaotic 🌀",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Alert: Suspicious Smell 👃", "Current Mood: Betrayed 😤"],
    contentProfessional: null,
    content:
      "The sky made a loud sound tonight. Multiple loud sounds. I handled it with grace and composure.\n\nOkay I hid under the bed. But I was MONITORING the situation from under the bed. There is a difference. I was in a bunker. Tactical.\n\nThe sounds stopped eventually. I emerged with full dignity. No one mentioned the bunker. Smart of them.",
  },
  {
    id: 303,
    year: 2022,
    date: "December 25, 2022",
    title: "Christmas: A Review",
    mood: "Happy 😄",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Alert: Someone Said 'Walk' 🦮"],
    contentProfessional: null,
    content:
      "There was a tree inside the house. I sniffed it. It is fake but it smells interesting. I give it 6 out of 10.\n\nI received: one (1) new toy, three (3) treats, and an unreasonable amount of belly rubs. The belly rubs were acceptable. I allowed them to continue for four minutes before walking away.\n\nOverall: Christmas is good. I endorse it.",
  },
  // 2021
  {
    id: 401,
    year: 2021,
    date: "March 20, 2021",
    title: "The Squirrel Returns",
    mood: "Victorious 🏆",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Target: That One Squirrel 🐿️", "Status: Investigating 🔍"],
    contentProfessional: null,
    content:
      "It is back. The squirrel. The one from last autumn who stole the energy from my yard and escaped into the oak tree.\n\nI spotted it from the window this morning. We made eye contact. It froze. I pressed my nose against the glass very slowly.\n\nIt ran. I consider this a victory. It knows. They all know.",
  },
  {
    id: 402,
    year: 2021,
    date: "August 9, 2021",
    title: "I Tried the Cat's Bed",
    mood: "Suspicious 🤨",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Target: Neighbour's Cat 🐱"],
    contentProfessional: null,
    content:
      "There is no cat in this house. But the neighbours left their cat's bed outside during a visit. I sat in it.\n\nIt is smaller than my bed. It smells wrong. And yet. I sat in it for twenty minutes. Just to know what the enemy experiences.\n\nIntelligence gathering. That is all this was.",
  },
  {
    id: 403,
    year: 2021,
    date: "December 1, 2021",
    title: "First Snow of the Year",
    mood: "Happy 😄",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Alert: Someone Said 'Walk' 🦮", "Current Mood: Zoomies 🌀"],
    contentProfessional: null,
    content:
      "Snow.\n\nSNOW.\n\nI ran in a circle. Then a bigger circle. Then I bit the snow. It is cold and it disappears when I bite it, which is suspicious, but I forgive it because it is very fun.\n\nI did zoomies for eleven minutes. The humans laughed and took photos. I did not mind. I was too busy doing zoomies.",
  },
  // 2020
  {
    id: 501,
    year: 2020,
    date: "March 15, 2020",
    title: "Everyone Stays Home Now",
    mood: "Suspicious 🤨",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Current Mood: Judgemental 😒", "Status: Investigating 🔍"],
    contentProfessional: null,
    content:
      'The humans are home. All day. Every day. This is unusual.\n\nOn one hand, more people to stare at. On the other hand, my quiet nap schedule has been completely disrupted. I was napping on the big sofa at 11am when a human sat down to do "a work call." I had to move. I gave them a look.\n\nI do not know what changed, but I am watching closely.',
  },
  {
    id: 502,
    year: 2020,
    date: "July 22, 2020",
    title: "I Supervised the Cooking",
    mood: "Hungry 🍖",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Current Mood: Hungry 🍖", "Status: Investigating 🔍"],
    contentProfessional: null,
    content:
      "The human made something that smelled incredible. I sat in the kitchen doorway for the entire duration. This is called supervision. I am a supervisor.\n\nNothing fell on the floor. This was a failure of physics.\n\nI received zero pieces. I then sat with my back to the kitchen for thirty minutes as a formal complaint.",
  },
  {
    id: 503,
    year: 2020,
    date: "October 31, 2020",
    title: "They Dressed Me Up",
    mood: "Betrayed 😤",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Current Mood: Betrayed 😤", "Current Mood: Judgemental 😒"],
    contentProfessional: null,
    content:
      'I was put in a costume. A bumblebee costume. With wings.\n\nI am a Shiba Inu. I have dignity. I have years of wisdom. I have a reputation.\n\nI wore the costume for exactly four minutes before I sat down and refused to move. They took many photos. I made sure my expression said "I remember everything."',
  },
  // 2019
  {
    id: 601,
    year: 2019,
    date: "April 6, 2019",
    title: "A New Dog Moved In Nearby",
    mood: "Suspicious 🤨",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Target: That One Squirrel 🐿️", "Alert: Suspicious Smell 👃"],
    contentProfessional: null,
    content:
      "There is a new dog on the street. A large one. Golden. It bounced when it walked. It seems very happy about everything. This is suspicious.\n\nI assessed it from a distance on our walk. It tried to sniff me. I turned my head exactly 45 degrees away. This means: I see you, but I have not dec.ided yet.\n\nDecision pending. Jury still out. I will report back.",
  },
  {
    id: 602,
    year: 2019,
    date: "August 30, 2019",
    title: "I Learned a New Trick (Refused It)",
    mood: "Dramatic 🎭",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Current Mood: Judgemental 😒"],
    contentProfessional: null,
    content:
      'The human tried to teach me "roll over." I know how to roll over. I have known since I was two. I chose not to do it.\n\nInstead I sat very still and stared at the treat for a long time. Then I did "sit" which I already know. Then I looked at them as if to say: this is what I offer. Take it or leave it.\n\nThey gave me the treat anyway. As expected.',
  },
  {
    id: 603,
    year: 2019,
    date: "December 31, 2019",
    title: "End of the Decade",
    mood: "Dramatic 🎭",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Status: Napping (on duty) 💤"],
    contentProfessional: null,
    content:
      "A decade is ending, apparently. The humans seem very emotional about this. I have been alive for 3 years and 4 months. That is a significant portion of a decade.\n\nI reflected on my achievements: many naps taken, several squirrels intimidated, one vacuum survived, countless treats consumed.\n\nI am proud of what I have built. I sat on the sofa and watched the fireworks from the window. I was not scared. I was merely observing. From inside. Under a blanket. Strategically.",
  },
  // 2018
  {
    id: 700,
    year: 2018,
    date: "April 18, 2018",
    title: "The Day I Arrived",
    mood: "Happy 😄",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Current Mood: Zoomies 🌀", "Alert: Someone Said 'Walk' 🦮"],
    contentProfessional: null,
    content:
      "April 18, 2018. Minnesota.\n\nI have been in this world for approximately zero minutes and I already know two things: it is very bright out here, and I am extremely cute.\n\nThere were others with me in the beginning. Sisters. Brothers. A whole pile of us, warm and wriggly and perfect. I was, naturally, the most distinguished of the group. You could tell by how I slept. Very authoritatively.\n\nThe humans who came to see us made a lot of sounds. High-pitched ones. The kind that mean they are overwhelmed by how wonderful we are. I accepted this as appropriate.\n\nI was healthy. Strong. My nose worked immediately, which I considered a great personal achievement. I could smell everything. Pine. Grass. The faint suggestion of kibble somewhere in the distance. Promising.\n\nI did not yet know about vacuums. Or mailmen. Or the injustice of diets. The world was new and warm and full of siblings to nap on.\n\nI was a puppy in Minnesota, and I was exactly where I was supposed to be.\n\nFor now.",
  },
  {
    id: 701,
    year: 2018,
    date: "February 3, 2018",
    title: "My First Snow",
    mood: "Happy 😄",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Current Mood: Zoomies 🌀", "Alert: Someone Said 'Walk' 🦮"],
    contentProfessional: null,
    content:
      "White stuff fell from the sky today. I ate some. It was cold and tasted like nothing, but disappearing when I bit it is a suspicious quality in any substance and I intend to monitor it.\n\nI ran very fast. In a circle. Then a bigger circle. The humans made sounds that I think mean they are happy. I was too busy running to check.\n\nI endorse the white stuff. 9 out of 10. Would eat again.",
  },
  {
    id: 702,
    year: 2018,
    date: "June 11, 2018",
    title: "I Met a Very Large Dog",
    mood: "Suspicious 🤨",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Alert: Suspicious Smell 👃", "Status: Investigating 🔍"],
    contentProfessional: null,
    content:
      "On today's walk I encountered a dog the size of a small horse. It had enormous paws. It looked down at me. I looked up at it.\n\nI did not back away. I am Mikki. I am two years old and I have seen things.\n\nWe sniffed. I walked away first because I chose to, not because I was intimidated. These are very different things. I want that noted.",
  },
  {
    id: 703,
    year: 2018,
    date: "September 20, 2018",
    title: "The First Time I Saw the Mailman",
    mood: "Victorious 🏆",
    photo: null,
    treats: 0,
    earScratches: 0,
    tags: ["Target: The Mailman 📬", "Alert: Doorbell Detected 🔔"],
    contentProfessional: null,
    content:
      "He came to the door. He put things through the slot. And then he LEFT.\n\nI barked once. Very loud. Very authoritative. He did not return. I stood at the door for six more minutes just in case.\n\nHe has not returned today. My message was clearly received. I will need to repeat this tomorrow, and the day after, and every day for the rest of my life, to ensure he keeps leaving.",
  },
];

const moodOptions = [
  "Happy 😄",
  "Betrayed 😤",
  "Sleepy 😴",
  "Hungry 🍖",
  "Victorious 🏆",
  "Suspicious 🤨",
  "Chaotic 🌀",
  "Investigative 🔍",
  "Dramatic 🎭",
];

const currentlyStatuses = [
  "Judging your outfit 👀",
  "Pretending not to hear you 🙉",
  "Staring at the wall for no reason 🧱",
  "Thinking about that treat from 3 years ago 🍖",
  "Plotting something. Unknown what. 🌀",
  "Sitting on the sunny spot. It is hers. 🌞",
  "Refusing to move from the couch 🛋️",
  "Sniffing a suspicious smell 🔍",
  "Watching you eat without blinking 👁️",
  "Napping professionally 💤",
  "Being extremely normal (lying) 🐕",
  "Shedding on the clean laundry 🧺",
];

const pawPositions = [
  { top: "5%", left: "3%", rotate: "20deg", size: 28 },
  { top: "12%", left: "91%", rotate: "-15deg", size: 22 },
  { top: "28%", left: "7%", rotate: "40deg", size: 18 },
  { top: "45%", left: "95%", rotate: "-30deg", size: 24 },
  { top: "62%", left: "2%", rotate: "10deg", size: 20 },
  { top: "78%", left: "88%", rotate: "55deg", size: 26 },
  { top: "90%", left: "10%", rotate: "-20deg", size: 16 },
];

function PawPrint({ style, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        ...style,
        position: "absolute",
        opacity: 0.15,
        pointerEvents: "none",
      }}
    >
      <ellipse
        cx="50"
        cy="70"
        rx="22"
        ry="18"
        fill="#c0392b"
        transform="rotate(-5 50 70)"
      />
      <ellipse cx="28" cy="48" rx="11" ry="13" fill="#c0392b" />
      <ellipse cx="72" cy="48" rx="11" ry="13" fill="#c0392b" />
      <ellipse cx="38" cy="32" rx="9" ry="11" fill="#c0392b" />
      <ellipse cx="62" cy="32" rx="9" ry="11" fill="#c0392b" />
    </svg>
  );
}

function PhotoUploader({ label, onPhoto, currentPhoto, isProfile }) {
  const ref = useRef();
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div
      onClick={() => ref.current.click()}
      style={{
        cursor: "pointer",
        width: isProfile ? 130 : "100%",
        height: isProfile ? 130 : "auto",
        minHeight: isProfile ? 130 : 220,
        borderRadius: isProfile ? "50%" : "8px",
        border: "3px dashed #e8c99a",
        background: currentPhoto ? "transparent" : "#fff8e7",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        flexShrink: 0,
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#e05c00";
        e.currentTarget.style.borderStyle = "solid";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e8c99a";
        e.currentTarget.style.borderStyle = "dashed";
      }}
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />
      {currentPhoto ? (
        <>
          <img
            src={currentPhoto}
            alt="Mikki"
            style={{
              width: "100%",
              height: "100%",
              objectFit: isProfile ? "cover" : "contain",
              background: "#fffef5",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.2s",
              borderRadius: isProfile ? "50%" : "6px",
              fontFamily: "'Caveat',cursive",
              color: "#fff",
              fontSize: "1rem",
              flexDirection: "column",
              gap: 4,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
          >
            <span style={{ fontSize: "1.5rem" }}>📷</span>
            <span>change photo</span>
          </div>
        </>
      ) : (
        <>
          <span style={{ fontSize: "2rem" }}>📷</span>
          <span
            style={{
              fontFamily: "'Caveat',cursive",
              color: "#a0704a",
              fontSize: "0.9rem",
              textAlign: "center",
              padding: "0 8px",
              marginTop: 4,
            }}
          >
            {label}
          </span>
        </>
      )}
    </div>
  );
}

// ── Paw-meter ──────────────────────────────────────────────────────────────
function PawMeter({
  treats,
  earScratches,
  bellyScratches,
  onTreat,
  onEarScratch,
  onBellyScratch,
}) {
  const [tp, setTp] = useState(false);
  const [ep, setEp] = useState(false);
  const [bp, setBp] = useState(false);
  const pop = (setter, cb) => {
    setter(true);
    cb();
    setTimeout(() => setter(false), 300);
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "0.8rem",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "1rem",
      }}
    >
      {[
        {
          label: "🦴 Virtual Treat",
          count: treats,
          popped: tp,
          setter: setTp,
          cb: onTreat,
        },
        {
          label: "👂 Ear Scratch",
          count: earScratches,
          popped: ep,
          setter: setEp,
          cb: onEarScratch,
        },
        {
          label: "🐾 Belly Scratch",
          count: bellyScratches,
          popped: bp,
          setter: setBp,
          cb: onBellyScratch,
        },
      ].map(({ label, count, popped, setter, cb }) => (
        <button
          key={label}
          onClick={() => pop(setter, cb)}
          style={{
            fontFamily: "'Caveat',cursive",
            fontSize: "1.05rem",
            background: popped ? "#8B2500" : "#fff3d4",
            color: popped ? "#fff" : "#8B2500",
            border: "2px solid #e8c99a",
            borderRadius: "20px",
            padding: "6px 16px",
            cursor: "pointer",
            transform: popped ? "scale(1.15)" : "scale(1)",
            transition: "all 0.15s",
          }}
        >
          {label} {count > 0 && <strong>×{count}</strong>}
        </button>
      ))}
    </div>
  );
}

// ── Mood Tags ──────────────────────────────────────────────────────────────
function MoodTags({ tags }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.4rem",
        marginTop: "0.7rem",
      }}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            fontFamily: "'Caveat',cursive",
            fontSize: "0.95rem",
            background: "#ffecd4",
            color: "#8B2500",
            border: "1.5px solid #f0b87a",
            borderRadius: "6px",
            padding: "2px 10px",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// -- Entry Comments --
function EntryComments(props) {
  var entryId = props.entryId;
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  var inp = {
    width: "100%",
    padding: "0.5rem 0.7rem",
    border: "2px solid #e8c99a",
    borderRadius: 8,
    fontFamily: "'Caveat',cursive",
    fontSize: "1.1rem",
    background: "#fffef5",
    color: "#3a2010",
    boxSizing: "border-box",
    outline: "none",
  };

  function submit() {
    if (!message.trim()) return;
    setComments(function (prev) {
      return prev.concat([
        {
          id: Date.now(),
          name: name.trim() || "anonymous",
          message: message.trim(),
          time: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        },
      ]);
    });
    setName("");
    setMessage("");
    setShowForm(false);
  }

  return (
    <div
      style={{
        marginTop: "1.2rem",
        borderTop: "1px dashed #e0c49a",
        paddingTop: "0.8rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.6rem",
        }}
      >
        <div
          style={{
            fontFamily: "'Permanent Marker',cursive",
            fontSize: "0.95rem",
            color: "#8B2500",
          }}
        >
          {comments.length > 0
            ? comments.length + " comment" + (comments.length > 1 ? "s" : "")
            : "no comments yet"}
        </div>
        <button
          onClick={function () {
            setShowForm(!showForm);
          }}
          style={{
            fontFamily: "'Caveat',cursive",
            fontSize: "0.95rem",
            background: "#fff3d4",
            color: "#8B2500",
            border: "1.5px solid #e8c99a",
            borderRadius: 20,
            padding: "3px 14px",
            cursor: "pointer",
          }}
        >
          {showForm ? "cancel" : "+ whisper to Mikki"}
        </button>
      </div>

      {showForm && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "0.8rem",
          }}
        >
          <input
            placeholder="your name (optional)..."
            value={name}
            onChange={function (e) {
              setName(e.target.value);
            }}
            style={Object.assign({}, inp, { fontSize: "1rem" })}
          />
          <textarea
            placeholder="leave a note for Mikki..."
            value={message}
            onChange={function (e) {
              setMessage(e.target.value);
            }}
            rows={2}
            style={Object.assign({}, inp, { resize: "vertical" })}
          />
          <div style={{ textAlign: "right" }}>
            <button
              onClick={submit}
              style={{
                fontFamily: "'Permanent Marker',cursive",
                fontSize: "0.9rem",
                background: "#8B2500",
                color: "#fff",
                border: "none",
                padding: "4px 16px",
                borderRadius: 6,
                cursor: "pointer",
                boxShadow: "2px 2px 0 #5a1500",
              }}
            >
              send to Mikki
            </button>
          </div>
        </div>
      )}

      {comments.length > 0 && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {comments.map(function (c) {
            return (
              <div
                key={c.id}
                style={{
                  background: "#fff8f0",
                  border: "1.5px solid #f0c890",
                  borderRadius: 8,
                  padding: "0.5rem 0.8rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Permanent Marker',cursive",
                      fontSize: "0.85rem",
                      color: "#8B2500",
                    }}
                  >
                    {c.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Caveat',cursive",
                      fontSize: "0.8rem",
                      color: "#c8a97a",
                    }}
                  >
                    {c.time}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Caveat',cursive",
                    fontSize: "1rem",
                    color: "#3a2010",
                  }}
                >
                  {c.message}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Entry Card ─────────────────────────────────────────────────────────────
function EntryCard({ entry, index, onUpdatePhoto, isOwner, onDelete, onEdit }) {
  const [open, setOpen] = useState(index === 0);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(entry.title);
  const [editContent, setEditContent] = useState(entry.content);
  const [editMood, setEditMood] = useState(entry.mood);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const rots = ["-1.2deg", "1.5deg", "-0.8deg", "1.1deg", "-1.8deg"];
  const rot = rots[index % rots.length];
  const inp = {
    width: "100%",
    padding: "0.6rem",
    border: "2px solid #e8c99a",
    borderRadius: 6,
    fontFamily: "'Caveat',cursive",
    fontSize: "1.1rem",
    background: "#fffef5",
    color: "#3a2010",
    boxSizing: "border-box",
    outline: "none",
  };

  function saveEdit() {
    onEdit(entry.id, {
      title: editTitle,
      content: editContent,
      mood: editMood,
    });
    setEditing(false);
  }

  return (
    <div
      style={{
        background: "#fffef5",
        border: "2px solid #e8c99a",
        borderRadius: 4,
        marginBottom: "2rem",
        transform: "rotate(" + rot + ")",
        boxShadow: "4px 4px 0 #c8a97a, 8px 8px 0 rgba(0,0,0,0.08)",
        transition: "transform 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "rotate(0deg) scale(1.01)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "rotate(" + rot + ")")
      }
    >
      {/* tape */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%) rotate(-2deg)",
          width: 80,
          height: 22,
          background: "rgba(255,220,100,0.6)",
          borderRadius: 2,
          zIndex: 2,
        }}
      />

      <div style={{ padding: "1.8rem 1.5rem 1rem" }}>
        {/* owner action buttons */}
        {isOwner && !editing && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "flex-end",
              marginBottom: "0.5rem",
            }}
          >
            <button
              onClick={function () {
                setEditing(true);
                setOpen(true);
              }}
              style={{
                fontFamily: "'Caveat',cursive",
                fontSize: "0.9rem",
                background: "#fff3d4",
                color: "#8B2500",
                border: "1.5px solid #e8c99a",
                borderRadius: 20,
                padding: "2px 12px",
                cursor: "pointer",
              }}
            >
              edit
            </button>
            {!confirmDelete ? (
              <button
                onClick={function () {
                  setConfirmDelete(true);
                }}
                style={{
                  fontFamily: "'Caveat',cursive",
                  fontSize: "0.9rem",
                  background: "#fdf2f2",
                  color: "#c0392b",
                  border: "1.5px solid #f1948a",
                  borderRadius: 20,
                  padding: "2px 12px",
                  cursor: "pointer",
                }}
              >
                delete
              </button>
            ) : (
              <span
                style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}
              >
                <span
                  style={{
                    fontFamily: "'Caveat',cursive",
                    fontSize: "0.9rem",
                    color: "#c0392b",
                  }}
                >
                  sure?
                </span>
                <button
                  onClick={function () {
                    onDelete(entry.id);
                  }}
                  style={{
                    fontFamily: "'Caveat',cursive",
                    fontSize: "0.9rem",
                    background: "#c0392b",
                    color: "#fff",
                    border: "none",
                    borderRadius: 20,
                    padding: "2px 12px",
                    cursor: "pointer",
                  }}
                >
                  yes
                </button>
                <button
                  onClick={function () {
                    setConfirmDelete(false);
                  }}
                  style={{
                    fontFamily: "'Caveat',cursive",
                    fontSize: "0.9rem",
                    background: "transparent",
                    color: "#a0704a",
                    border: "1.5px solid #e8c99a",
                    borderRadius: 20,
                    padding: "2px 10px",
                    cursor: "pointer",
                  }}
                >
                  no
                </button>
              </span>
            )}
          </div>
        )}

        {/* edit form */}
        {editing ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
          >
            <input
              value={editTitle}
              onChange={function (e) {
                setEditTitle(e.target.value);
              }}
              style={inp}
              placeholder="title"
            />
            <select
              value={editMood}
              onChange={function (e) {
                setEditMood(e.target.value);
              }}
              style={inp}
            >
              {moodOptions.map(function (m) {
                return <option key={m}>{m}</option>;
              })}
            </select>
            <textarea
              value={editContent}
              onChange={function (e) {
                setEditContent(e.target.value);
              }}
              rows={8}
              style={Object.assign({}, inp, {
                resize: "vertical",
                lineHeight: 1.6,
              })}
            />
            <div style={{ display: "flex", gap: "0.8rem" }}>
              <button
                onClick={saveEdit}
                style={{
                  fontFamily: "'Permanent Marker',cursive",
                  fontSize: "0.95rem",
                  background: "#8B2500",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1.2rem",
                  borderRadius: 6,
                  cursor: "pointer",
                  boxShadow: "2px 2px 0 #5a1500",
                }}
              >
                save
              </button>
              <button
                onClick={function () {
                  setEditing(false);
                }}
                style={{
                  fontFamily: "'Caveat',cursive",
                  fontSize: "1rem",
                  background: "transparent",
                  color: "#a0704a",
                  border: "2px solid #e8c99a",
                  padding: "0.5rem 1rem",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* clickable header */}
            <div style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
              <div
                style={{
                  fontFamily: "'Permanent Marker',cursive",
                  fontSize: "1.4rem",
                  color: "#8B2500",
                  lineHeight: 1.2,
                }}
              >
                {entry.title}
              </div>
              <div
                style={{
                  fontFamily: "'Caveat',cursive",
                  fontSize: "1rem",
                  color: "#a0704a",
                  marginTop: "0.3rem",
                }}
              >
                📅 {entry.date}
              </div>
              <div
                style={{
                  display: "inline-block",
                  background: "#fff3d4",
                  border: "1.5px solid #e8c99a",
                  borderRadius: 20,
                  padding: "4px 12px",
                  fontFamily: "'Caveat',cursive",
                  fontSize: "1rem",
                  color: "#8B2500",
                  marginTop: "0.5rem",
                }}
              >
                Mood: {entry.mood}
              </div>
              <MoodTags tags={entry.tags} />
            </div>

            {open && (
              <div
                style={{
                  marginTop: "1.2rem",
                  borderTop: "1px dashed #e0c49a",
                  paddingTop: "1rem",
                }}
              >
                {/* content */}
                <div
                  style={{
                    fontFamily: "'Caveat',cursive",
                    fontSize: "1.2rem",
                    lineHeight: 1.8,
                    color: "#3a2010",
                    whiteSpace: "pre-line",
                  }}
                >
                  {entry.content}
                </div>

                {/* photo above the dotted line */}
                <div style={{ marginTop: "1rem" }}>
                  <PhotoUploader
                    label="tap to add a photo"
                    isProfile={false}
                    currentPhoto={entry.photo}
                    onPhoto={(d) => onUpdatePhoto(entry.id, d)}
                  />
                </div>

                {/* comments below photo */}
                <EntryComments entryId={entry.id} />
              </div>
            )}

            <div
              style={{
                textAlign: "right",
                marginTop: "0.8rem",
                fontFamily: "'Caveat',cursive",
                color: "#c0704a",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onClick={() => setOpen(!open)}
            >
              {open ? "▲ close" : "▼ read more"}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── New Entry Form ─────────────────────────────────────────────────────────
function NewEntryForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState(moodOptions[0]);
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const inp = {
    width: "100%",
    padding: "0.7rem",
    border: "2px solid #e8c99a",
    borderRadius: 6,
    fontFamily: "'Caveat',cursive",
    fontSize: "1.1rem",
    background: "#fffef5",
    color: "#3a2010",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <div
      style={{
        background: "#fffef5",
        border: "2px solid #e8c99a",
        borderRadius: 4,
        padding: "1.8rem 1.5rem",
        boxShadow: "4px 4px 0 #c8a97a",
        transform: "rotate(0.5deg)",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          fontFamily: "'Permanent Marker',cursive",
          fontSize: "1.3rem",
          color: "#8B2500",
          marginBottom: "1rem",
        }}
      >
        🐾 New Diary Entry
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          placeholder="Entry title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inp}
        />
        <input
          placeholder="Date..."
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inp}
        />
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={inp}
        >
          {moodOptions.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        {/* Tag picker */}
        <div>
          <button
            type="button"
            onClick={() => setShowTagPicker(!showTagPicker)}
            style={{
              fontFamily: "'Caveat',cursive",
              fontSize: "1rem",
              background: "#fff3d4",
              color: "#8B2500",
              border: "1.5px solid #e8c99a",
              borderRadius: 20,
              padding: "5px 14px",
              cursor: "pointer",
            }}
          >
            🏷️{" "}
            {showTagPicker
              ? "close tags ▲"
              : "add mood tags ▼ " +
                (selectedTags.length > 0
                  ? "(" + selectedTags.length + ")"
                  : "")}
          </button>
          {showTagPicker && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginTop: "0.6rem",
              }}
            >
              {PRESET_TAGS.map((tag) => (
                <span
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    fontFamily: "'Caveat',cursive",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    background: selectedTags.includes(tag)
                      ? "#8B2500"
                      : "#ffecd4",
                    color: selectedTags.includes(tag) ? "#fff" : "#8B2500",
                    border: "1.5px solid #f0b87a",
                    borderRadius: 6,
                    padding: "2px 10px",
                    transition: "background 0.15s",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {selectedTags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginTop: "0.5rem",
              }}
            >
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Caveat',cursive",
                    fontSize: "0.85rem",
                    background: "#ffecd4",
                    color: "#8B2500",
                    border: "1.5px solid #f0b87a",
                    borderRadius: 6,
                    padding: "2px 8px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            style={{
              fontFamily: "'Caveat',cursive",
              color: "#a0704a",
              marginBottom: "0.4rem",
              fontSize: "1rem",
            }}
          >
            📸 Add a photo of Mikki (optional)
          </div>
          <PhotoUploader
            label="upload Mikki's photo"
            isProfile={false}
            currentPhoto={photo}
            onPhoto={setPhoto}
          />
        </div>

        <textarea
          placeholder="Dear diary, today was eventful..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          style={{ ...inp, resize: "vertical", lineHeight: 1.6 }}
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => {
              if (title.trim() && content.trim())
                onAdd({
                  id: Date.now(),
                  date,
                  title,
                  mood,
                  content,
                  photo,
                  tags: selectedTags,
                  treats: 0,
                  earScratches: 0,
                  contentProfessional: null,
                });
            }}
            style={{
              fontFamily: "'Permanent Marker',cursive",
              fontSize: "1rem",
              background: "#8B2500",
              color: "#fff",
              border: "none",
              padding: "0.7rem 1.5rem",
              borderRadius: 6,
              cursor: "pointer",
              boxShadow: "3px 3px 0 #5a1500",
            }}
          >
            Post it! 🐾
          </button>
          <button
            onClick={onCancel}
            style={{
              fontFamily: "'Caveat',cursive",
              fontSize: "1.1rem",
              background: "transparent",
              color: "#a0704a",
              border: "2px solid #e8c99a",
              padding: "0.7rem 1.5rem",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            nevermind
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function MikkiDiary() {
  const [entries, setEntries] = useState(initialEntries);
  const [showForm, setShowForm] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [page, setPage] = useState(1);
  const [treats, setTreats] = useState(0);
  const [earScratches, setEarScratches] = useState(0);
  const [bellyScratches, setBellyScratches] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginInput, setLoginInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const OWNER_PASSWORD = "mikki2026";
  const [currentStatus] = useState(
    () =>
      currentlyStatuses[Math.floor(Math.random() * currentlyStatuses.length)]
  );

  const handleTreat = () => setTreats((t) => t + 1);
  const handleEarScratch = () => setEarScratches((t) => t + 1);
  const handleBellyScratch = () => setBellyScratches((t) => t + 1);

  const handleLogin = () => {
    if (loginInput === OWNER_PASSWORD) {
      setIsOwner(true);
      setShowLogin(false);
      setLoginInput("");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const updateEntryPhoto = (id, dataUrl) =>
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, photo: dataUrl } : e))
    );

  const deleteEntry = (id) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));

  const editEntry = (id, changes) =>
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...changes } : e))
    );

  const years = [...new Set(entries.map((e) => e.year))].sort((a, b) => b - a);
  const yearEntries = entries.filter((e) => e.year === selectedYear);
  const totalPages = Math.ceil(yearEntries.length / 3);
  const pageEntries = yearEntries.slice((page - 1) * 3, page * 3);

  const goToYear = (y) => {
    setSelectedYear(y);
    setPage(1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fdf3e3",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>
        {
          "@import url('https://fonts.googleapis.com/css2?family=Henny+Penny&family=Special+Elite&family=Delius&family=Permanent+Marker&family=Caveat:wght@400;600;700&display=swap'); * { box-sizing: border-box; } body { margin: 0; } ::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #fdf3e3; } ::-webkit-scrollbar-thumb { background: #c8a97a; border-radius: 4px; } @keyframes wobble { 0%,100%{transform:rotate(-2deg);}50%{transform:rotate(2deg);} } @keyframes fadeDown { from{opacity:0;transform:translateY(-20px);}to{opacity:1;transform:translateY(0);} }"
        }
      </style>

      {pawPositions.map((p, i) => (
        <PawPrint
          key={i}
          size={p.size}
          style={{
            top: p.top,
            left: p.left,
            transform: "rotate(" + p.rotate + ")",
          }}
        />
      ))}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
            animation: "fadeDown 0.7s ease",
          }}
        >
          <div
            style={{
              fontFamily: "'Henny Penny',cursive",
              fontSize: "clamp(2.5rem,8vw,4rem)",
              color: "#8B2500",
              lineHeight: 1.1,
              textShadow: "3px 3px 0 #e8c99a",
            }}
          >
            Mikki's
            <br />
            Secret Diary 🐕
          </div>
          <div
            style={{
              fontFamily: "'Caveat',cursive",
              fontSize: "1.2rem",
              color: "#a0704a",
              marginTop: "0.5rem",
            }}
          >
            (it is not secret, she told everyone)
          </div>

          {/* Profile card */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.2rem",
              background: "#fff8e7",
              border: "2px dashed #e8c99a",
              borderRadius: 16,
              padding: "1rem 1.5rem",
              marginTop: "1.5rem",
              transform: "rotate(-1deg)",
              boxShadow: "2px 2px 0 #d4a96a",
              animation: "wobble 4s ease-in-out infinite",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <PhotoUploader
              label={"tap to add\nMikki's photo"}
              isProfile={true}
              currentPhoto={profilePhoto}
              onPhoto={setProfilePhoto}
            />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: "1.4rem",
                  color: "#8B2500",
                }}
              >
                Mikki 🦊
              </div>
              <div
                style={{
                  fontFamily: "'Special Elite',cursive",
                  fontSize: "1.1rem",
                  color: "#5a3010",
                  lineHeight: 1.7,
                }}
              >
                🎂 {getMikkiAge()}
                <br />
                🍩 Volumetrically gifted
                <br />
                🧠 Too smart for this family
                <br />
                ✍️ Diarist & drama queen
              </div>
            </div>
          </div>
        </div>

        {/* Owner login modal */}
        {showLogin && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#fffef5",
                border: "2px solid #e8c99a",
                borderRadius: 12,
                padding: "2rem",
                boxShadow: "6px 6px 0 #c8a97a",
                width: 300,
                transform: "rotate(-1deg)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Permanent Marker',cursive",
                  fontSize: "1.3rem",
                  color: "#8B2500",
                  marginBottom: "0.5rem",
                }}
              >
                🐾 Mikki's Diary
              </div>
              <div
                style={{
                  fontFamily: "'Caveat',cursive",
                  fontSize: "1.1rem",
                  color: "#a0704a",
                  marginBottom: "1rem",
                }}
              >
                Owner access only
              </div>
              <input
                type="password"
                placeholder="enter password..."
                value={loginInput}
                onChange={(e) => {
                  setLoginInput(e.target.value);
                  setLoginError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  border: "2px solid " + (loginError ? "#c0392b" : "#e8c99a"),
                  borderRadius: 6,
                  fontFamily: "'Caveat',cursive",
                  fontSize: "1.1rem",
                  background: "#fff8e7",
                  color: "#3a2010",
                  boxSizing: "border-box",
                  outline: "none",
                  marginBottom: "0.5rem",
                }}
              />
              {loginError && (
                <div
                  style={{
                    fontFamily: "'Caveat',cursive",
                    color: "#c0392b",
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  wrong password 🙅
                </div>
              )}
              <div
                style={{ display: "flex", gap: "0.8rem", marginTop: "0.3rem" }}
              >
                <button
                  onClick={handleLogin}
                  style={{
                    fontFamily: "'Permanent Marker',cursive",
                    fontSize: "0.95rem",
                    background: "#8B2500",
                    color: "#fff",
                    border: "none",
                    padding: "0.6rem 1.2rem",
                    borderRadius: 6,
                    cursor: "pointer",
                    boxShadow: "2px 2px 0 #5a1500",
                  }}
                >
                  let me in 🐕
                </button>
                <button
                  onClick={() => {
                    setShowLogin(false);
                    setLoginInput("");
                    setLoginError(false);
                  }}
                  style={{
                    fontFamily: "'Caveat',cursive",
                    fontSize: "1rem",
                    background: "transparent",
                    color: "#a0704a",
                    border: "2px solid #e8c99a",
                    padding: "0.6rem 1rem",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New entry button — owner only */}
        {isOwner && !showForm && (
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <button
              onClick={() => setShowForm(true)}
              style={{
                fontFamily: "'Permanent Marker',cursive",
                fontSize: "1.1rem",
                background: "#e05c00",
                color: "#fff",
                border: "none",
                padding: "0.8rem 2rem",
                borderRadius: 8,
                cursor: "pointer",
                boxShadow: "4px 4px 0 #8B2500",
                transform: "rotate(-1deg)",
              }}
            >
              + Write a new entry 🐾
            </button>
            <button
              onClick={() => setIsOwner(false)}
              style={{
                marginLeft: "1rem",
                fontFamily: "'Caveat',cursive",
                fontSize: "0.95rem",
                background: "transparent",
                color: "#c8a97a",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              log out
            </button>
          </div>
        )}

        {/* Secret owner login trigger — tiny paw in corner */}
        {!isOwner && !showLogin && (
          <div style={{ textAlign: "right", marginBottom: "0.5rem" }}>
            <span
              onClick={() => setShowLogin(true)}
              style={{
                fontFamily: "'Caveat',cursive",
                fontSize: "0.85rem",
                color: "#d4c0a0",
                cursor: "pointer",
                userSelect: "none",
              }}
              title="owner login"
            >
              🐾
            </span>
          </div>
        )}

        {isOwner && showForm && (
          <NewEntryForm
            onAdd={(e) => {
              const year = new Date().getFullYear();
              setEntries([{ ...e, year }, ...entries]);
              setSelectedYear(year);
              setPage(1);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Main layout: diaries + sticky year sidebar */}
        <div
          style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
        >
          {/* Diary entries */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Entry count */}
            <div
              style={{
                textAlign: "center",
                fontFamily: "'Caveat',cursive",
                color: "#a0704a",
                fontSize: "1rem",
                marginBottom: "1rem",
              }}
            >
              {yearEntries.length}{" "}
              {yearEntries.length === 1 ? "entry" : "entries"} in {selectedYear}{" "}
              · page {page} of {totalPages || 1}
            </div>

            {pageEntries.map((entry, i) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                index={i}
                onUpdatePhoto={updateEntryPhoto}
                isOwner={isOwner}
                onDelete={deleteEntry}
                onEdit={editEntry}
              />
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    fontFamily: "'Permanent Marker',cursive",
                    fontSize: "1rem",
                    background: page === 1 ? "#f0e0c8" : "#fff3d4",
                    color: page === 1 ? "#c8a97a" : "#8B2500",
                    border: "2px solid #e8c99a",
                    borderRadius: 8,
                    padding: "6px 18px",
                    cursor: page === 1 ? "default" : "pointer",
                    boxShadow: page === 1 ? "none" : "2px 2px 0 #d4a96a",
                  }}
                >
                  ← prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    fontFamily: "'Permanent Marker',cursive",
                    fontSize: "1rem",
                    background: page === totalPages ? "#f0e0c8" : "#fff3d4",
                    color: page === totalPages ? "#c8a97a" : "#8B2500",
                    border: "2px solid #e8c99a",
                    borderRadius: 8,
                    padding: "6px 18px",
                    cursor: page === totalPages ? "default" : "pointer",
                    boxShadow:
                      page === totalPages ? "none" : "2px 2px 0 #d4a96a",
                  }}
                >
                  next →
                </button>
              </div>
            )}
          </div>

          {/* Sticky year sidebar */}
          <div
            style={{
              position: "sticky",
              top: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "stretch",
              width: 90,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: "'Permanent Marker',cursive",
                fontSize: "0.85rem",
                color: "#c8a97a",
                textAlign: "center",
                marginBottom: "0.3rem",
              }}
            >
              📅 years
            </div>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => goToYear(y)}
                style={{
                  fontFamily: "'Permanent Marker',cursive",
                  fontSize: "1rem",
                  background: y === selectedYear ? "#8B2500" : "#fff3d4",
                  color: y === selectedYear ? "#fff" : "#8B2500",
                  border: "2px solid #e8c99a",
                  borderRadius: "8px",
                  padding: "7px 0",
                  cursor: "pointer",
                  width: "100%",
                  boxShadow:
                    y === selectedYear
                      ? "3px 3px 0 #5a1500"
                      : "2px 2px 0 #d4a96a",
                  transform: y === selectedYear ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.15s",
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
        {/* end main layout */}

        <div style={{ marginTop: "3rem" }}>
          <PawMeter
            treats={treats}
            earScratches={earScratches}
            bellyScratches={bellyScratches}
            onTreat={handleTreat}
            onEarScratch={handleEarScratch}
            onBellyScratch={handleBellyScratch}
          />
          <div
            style={{
              borderTop: "1px dashed #e0c49a",
              paddingTop: "1.5rem",
              marginTop: "2rem",
              textAlign: "center",
              fontSize: "1rem",
              fontFamily: "sans-serif",
              color: "#c09060",
            }}
          >
            Currently: {currentStatus}
            <br />© 2026 Mikki's Shiba Fortress. All rights reserved by the Dog.
          </div>
        </div>
      </div>
    </div>
  );
}
