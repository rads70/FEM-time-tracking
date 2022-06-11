state = {
   timeframe: "daily",
};

const cards = [
   { type: "Work", icon: "icon-work.svg" },
   { type: "Play", icon: "icon-play.svg" },
   { type: "Study", icon: "icon-study.svg" },
   { type: "Exercise", icon: "icon-exercise.svg" },
   { type: "Social", icon: "icon-social.svg" },
   { type: "Self Care", icon: "icon-self-care.svg" },
];
const cardsDiv = document.querySelector("#cards");
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");

function handleClick(e) {
   cardsDiv.innerHTML = "";
   daily.classList.remove("active");
   weekly.classList.remove("active");
   monthly.classList.remove("active");
   setTimeframe(e.id);
   e.classList.toggle("active");

   cards.forEach((card) => {
      return hours(card);
   });
}

function setTimeframe(timeframe) {
   state.timeframe = timeframe;
}

function hours(card) {
   fetch("data.json")
      .then((response) => response.json())
      .then((response) => {
         return response.filter((type) => type.title === card.type);
      })
      .then((data) => {
         let { previous, current } = data[0].timeframes[state.timeframe];
         cardsDiv.innerHTML += printCard(current, previous, card);
      });
}

function printCard(current, previous, card) {
   return ` <div class="card card-hours ${
      card.type === "Self Care" ? "selfcare" : card.type.toLowerCase()
   }" class="text-white">
   <div>
      <div class="card__heading">
         <img class="card-icon" src="/images/${card.icon}" alt="" />
      </div>
   </div>
   <div class="card__body">
      <div class="title">
         <span>${card.type}</span
         ><img src="/images/icon-ellipsis.svg" alt="" />
      </div>
      <div class="hours">
         <span class="fw-300">${current}hrs</span>
         <span class="text-offWhite fw-300"
            >Last week -
           ${previous}
            hrs</span
         >
      </div>
   </div>
</div>`;
}

cards.forEach((card) => {
   hours(card);
});
