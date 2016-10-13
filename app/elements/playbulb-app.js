(function () {
  Polymer({
    is: 'playbulb-app',

    properties: {

      selectedPage: {
        type: Number,
        readOnly: true,
        value: 0
      },

      selectedEffect: {
        type: Number,
        observer: '_selectedEffectChanged'
      },

      effects: {
        type: Array,
        value: function () {
          return [ 'no_effect', 'candle_effect', 'flashing', 'pulse', 'rainbow', 'rainbow_fade' ]
        }
      },

      device: {
        type: Object
      },

      name: {
        type: String
      }
    },

    observers: [
      '_deviceChanged(device)'
    ],

    connect: function () {
      this.$.playbulb.connect()
    },

    _selectedEffectChanged: function (selectedEffect) {
      if (this.$.playbulb.device) {
        switch (selectedEffect) {
          case 0:
            this.resetEffect()
            break
          case 1:
            this.setCandleEffectColor()
            break
          case 2:
            this.setflashingColor()
            break
          case 3:
            this.setPulseColor()
            break
          case 4:
            this.setRainbow()
            break
          case 5:
            this.setRainbowFade()
            break
          default:
            this.resetEffect()
            break
        }
      }
    },

    resetEffect: function () {
      this.$.playbulb.resetEffect(this.$.colorWheel.red, this.$.colorWheel.green, this.$.colorWheel.blue)
    },

    setColor: function () {
      this._selectedEffectChanged(this.selectedEffect)
    },

    setCandleEffectColor: function () {
      this.$.playbulb.setCandleEffectColor(this.$.colorWheel.red, this.$.colorWheel.green, this.$.colorWheel.blue)
    },

    setflashingColor: function () {
      this.$.playbulb.setFlashingColor(this.$.colorWheel.red, this.$.colorWheel.green, this.$.colorWheel.blue)
    },

    setPulseColor: function () {
      this.$.playbulb.setPulseColor(this.$.colorWheel.red, this.$.colorWheel.green, this.$.colorWheel.blue)
    },

    setRainbow: function () {
      this.$.playbulb.setRainbow()
    },

    setRainbowFade: function () {
      this.$.playbulb.setRainbowFade()
    },

    _formatEffectItem: function (item) {
      return item
        .split('_')
        .map(value => value.charAt(0).toUpperCase() + value.slice(1))
        .join(' ')
    },

    _deviceChanged: function (device) {
      if (device) {
        this._setSelectedPage(1)
      }
    },

    _isChecked: function (selectedEffect, index) {
      return selectedEffect === index
    },

    _blurName: function (event) {
      this.$.playbulb.setName(event.target.textContent)
    }
  })
})()
