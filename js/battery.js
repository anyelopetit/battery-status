const chargeLevel = document.getElementById('charge-level');
const charge = document.getElementById('charge');
const chargingTimeRef = document.getElementById('charging-time');

window.onload = () => {
  // For browsers that don't support the battery status API
  if (!navigator.getBattery) {
    chargeLevel.textContent = "N/A";
    charge.textContent = "N/A";
    chargingTimeRef.textContent = "N/A";
    alert("Battery Status Api is not supported in you browser");
    return false;
  }

  navigator.getBattery().then((battery) => {
    // chargeLevel.textContent = Math.round(battery.level * 100);
    // charge.textContent = battery.charging ? 'charging' : 'not charging';
    // chargingTimeRef.textContent = battery.chargingTime;

    // battery.addEventListener('chargingchange', () => {
    //   charge.textContent = battery.charging ? 'charging' : 'not charging';
    // });

    // battery.addEventListener('levelchange', () => {
    //   chargeLevel.textContent = Math.round(battery.level * 100);
    // });

    // battery.addEventListener('chargingtimechange', () => {
    //   chargingTimeRef.textContent = battery.chargingTime;
    // });

    function updateAllBatteryInfo() {
      // updateChargeInfo();
      updateLevelInfo();
      updateChargingInfo();
    }
    updateAllBatteryInfo();

    // When the charging status changes
    battery.addEventListener('chargingchange', function () {
      updateAllBatteryInfo();
    });

    // When the Battery Level changes
    battery.addEventListener('levelchange', function () {
      updateAllBatteryInfo();
    });

    function updateChargingInfo() {
      if (battery.charging) {
        charge.classList.add('active');
        chargingTimeRef.innerText = 'Charging';
      } else {
        charge.classList.remove('active');

        // Display time left to discharge only when it is a integer value i.e not infinity
        if (parseInt(battery.dischargingTime)) {
          let hr = parseInt(battery.dischargingTime / 3600);
          let min = parseInt(battery.dischargingTime / 60 - (hr * 60));
          chargingTimeRef.innerText = `${hr}hrs ${min}min remaining`;
        }
      }
    }

    function updateLevelInfo() {
      let batteryLevel = `${parseInt(battery.level * 100)}%`
      charge.style.width = batteryLevel;
      chargeLevel.innerText = batteryLevel;
    }
  });
}