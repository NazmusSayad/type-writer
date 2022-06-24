const TypeWriter = function (target, data, options) {
   this.target = target
   this.data = data.map((str) => str.trim())
   this.isRunning = null
   this.stats = {}
   this.options = {
      writeSpeed: 85,
      clearSpeed: 50,
      writeAfter: 150,
      clearAfter: 1500,
      superAccurate: false,
   }
   Object.assign(this.options, options)
   console.log(this.options)
}
TypeWriter.prototype.start = function () {
   if (this.isRunning) return true
   if (this.isRunning == null) {
      this.target.innerHTML = ""
      this.stats.indElement = 0
      this.stats.ind = 0
   }
   if (!this.isRunning) this.isRunning = true

   // Current operation text
   let text = this.data[this.stats.indElement]

   const write = () => {
      if (!this.isRunning) return

      const letter = text[this.stats.ind] // Current operation letter

      if (letter !== undefined) {
         this.stats.ind++
         this.target.append(letter)
         return setTimeout(write, this.options.writeSpeed)
      }

      let clearAfter = this.options.clearAfter
      if (this.options.superAccurate) {
         // If SuperAccurate then remove the extra loop time
         clearAfter -= this.options.writeSpeed
         clearAfter = clearAfter < 0 ? 0 : clearAfter
      }
      setTimeout(clear, clearAfter)
   }

   const clear = () => {
      if (!this.isRunning) return

      const lastChild = this.target.lastChild

      if (lastChild !== null) {
         lastChild.remove()
         return setTimeout(clear, this.options.clearSpeed)
      }

      if (this.stats.indElement < this.data.length - 1) this.stats.indElement++
      else this.stats.indElement = 0
      text = this.data[this.stats.indElement]
      this.stats.ind = 0

      let writeAfter = this.options.writeAfter
      if (this.options.superAccurate) {
         // If SuperAccurate then remove the extra loop time
         writeAfter -= this.options.clearSpeed
         writeAfter = writeAfter < 0 ? 0 : writeAfter
      }
      setTimeout(write, writeAfter)
   }

   write()
}
TypeWriter.prototype.stop = function () {
   this.isRunning = false
}
TypeWriter.prototype.reset = function () {
   this.isRunning = null
   this.stats = {}
}
TypeWriter.prototype.clear = function () {
   this.target.innerHTML = ""
}
TypeWriter.prototype.hardReset = function () {
   this.reset()
   this.clear()
}

// export default TypeWriter
