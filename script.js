const target = document.querySelector(`#text`)
const list = [
   "First text.",
   "Second text.",
   "Third text.",
   "Fourth text.",
   "Fifth text.",
   "Sixth text.",
   "Last text.",
]
const options = {
   // writeSpeed: 75,
   // clearSpeed: 50,
   // writeAfter: 150,
   // clearAfter: 1500,
   // superAccurate: false,
}

const typer = new TypeWriter(target, list, options)
typer.start()
