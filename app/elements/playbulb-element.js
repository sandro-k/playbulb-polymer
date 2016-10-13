(function () {
  'use strict'

  // noinspection JSUnresolvedFunction
  let encoder = new TextEncoder('utf-8')
  // noinspection JSUnresolvedFunction
  let decoder = new TextDecoder('utf-8')

  Polymer({
    is: 'playbulb-element',

    properties: {
      battery: {
        type: Number,
        readOnly: true,
        notify: true,
        value: NaN
      },

      device: {
        type: Object,
        readOnly: true,
        notify: true,
        value: null
      },

      _device: {
        type: Object,
        observer: '_setDevice'
      },

      name: {
        type: String,
        readOnly: true,
        notify: true,
        value: 'loading..'
      },

      color: {
        type: String,
        readOnly: true,
        notify: true
      },

      serviceFilter: {
        type: Object,
        value: function () {
          return [ 0xFF02 ]
        }
      },

      candelServiceUUID: {
        type: Number,
        value: 0xFFFC
      },

      candelEffectUUID: {
        type: Number,
        value: 0xFFFB
      },

      candelNameUUID: {
        type: Number,
        value: 0xFFFF
      },

      _effect: {
        type: Object
      }
    },

    /**
     *
     */
    connect: function () {
      this.$.bluetoothDevice.request().then(() => {
        this.$.colorCharacteristic.read().then(this._updateColor)
        this.$.effectCharacteristic.read()
        this.$.nameCharacteristic.read()
        return this.$.batteryCharacteristic.startNotifications()
      })
    },

    setColor: function (r, g, b, resetEffect) {
      let data = new Uint8Array([ 0x00, r, g, b ])
      this.$.colorCharacteristic.write(data)
    },

    resetEffect: function (r, g, b) {
      let effect = new Uint8Array([ 0x00, r, g, b, 0x00, 0x00, 0x00, 0x00 ])
      return this.$.effectCharacteristic.write(effect).then(() => {
        this.setColor(r, g, b)
      })
    },

    _updateBattery: function (event, details) {
      this._setBattery(details.value.getUint8(0))
    },

    _updateEffect: function (event, details) {
      let data = []
      for (var i = 0; i < 8; i++) {
        data.push(details.value.getUint8(i))
      }
    },

    _updateName: function (event, details) {
      this._setName(decoder.decode(details.value))
    },

    _updateColor: function (event, details) {
      if (details && details.value) {
        var intToHex = function (i) {
          let hex = i.toString(16)
          return hex.length === 1 ? '0' + hex : hex
        }

        let r = intToHex(details.value.getUint8(1))
        let g = intToHex(details.value.getUint8(2))
        let b = intToHex(details.value.getUint8(3))
        this._setColor('#' + r + g + b)
      }
    },

    setCandleEffectColor: function (r, g, b) {
      let data = [ 0x00, r, g, b, 0x04, 0x00, 0x01, 0x00 ]

      // Returns color when fulfilled.
      return this.$.effectCharacteristic
        .write(new Uint8Array(data))
        .then(this.$.effectCharacteristic.read.bind(this.$.effectCharacteristic))
        .then(() => [ r, g, b ])
    },

    setFlashingColor: function (r, g, b) {
      let data = [ 0x00, r, g, b, 0x00, 0x00, 0x1F, 0x00 ]
      // Returns color when fulfilled.
      return this.$.effectCharacteristic
        .write(new Uint8Array(data))
        .then(this.$.effectCharacteristic.read.bind(this.$.effectCharacteristic))
        .then(() => [ r, g, b ])
    },

    setPulseColor: function (r, g, b) {
      // We have to correct user color to make it look nice for real...
      let newRed = Math.min(Math.round(r / 64) * 64, 255)
      let newGreen = Math.min(Math.round(g / 64) * 64, 255)
      let newBlue = Math.min(Math.round(b / 64) * 64, 255)
      let data = [ 0x00, newRed, newGreen, newBlue, 0x01, 0x00, 0x09, 0x00 ]
      // Returns color when fulfilled.
      return this.$.effectCharacteristic
        .write(new Uint8Array(data))
        .then(this.$.effectCharacteristic.read.bind(this.$.effectCharacteristic))
        .then(() => [ r, g, b ])
    },

    setRainbow: function () {
      let data = [ 0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0x00 ]
      return this.$.effectCharacteristic
        .write(new Uint8Array(data))
        .then(this.$.effectCharacteristic.read.bind(this.$.effectCharacteristic))
    },

    setRainbowFade: function () {
      let data = [ 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x26, 0x00 ]
      return this.$.effectCharacteristic
        .write(new Uint8Array(data))
        .then(this.$.effectCharacteristic.read.bind(this.$.effectCharacteristic))
    },

    setName: function (name) {
      let data = encoder.encode(name)
      return this.$.nameCharacteristic.write(data)
    }

  })
})()
