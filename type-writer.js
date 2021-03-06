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
}
TypeWriter.prototype.start = function () {
   if (this.isRunning) return true
   if (this.isRunning == null) {
      this.stats.indElement = 0
      this.stats.ind = 0
   }
   if (!this.isRunning) this.isRunning = true

   // Current operation text
   
   const write = () => {
      if (!this.isRunning) return
      
      let text = this.data[this.stats.indElement]
      const letter = text[this.stats.ind] // Current operation letter
      if (letter !== undefined) {
         this.stats.ind++
         this.target.append(letter)
         return setTimeout(write, this.options.writeSpeed)
      }

      setTimeout(clear, this.options.clearAfter)
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

      this.stats.ind = 0

      setTimeout(write, this.options.writeAfter)
   }

   write()
}
TypeWriter.prototype.stop = function () {
   this.isRunning = false
}
TypeWriter.prototype.reset = function () {
   this.target.innerHTML = ""
   this.isRunning = null
   this.stats = {}
}

// export default TypeWriter
