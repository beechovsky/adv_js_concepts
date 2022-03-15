// Encapsulation
const makeNuclearButton = () => {
    let timeWithoutDestruction = 0;
    const passTime = () => timeWithoutDestruction++;
    const totalPeaceTime = () => timeWithoutDestruction;
    const launch = () => {
        timeWithoutDestruction = -1;
        return 'BOOOM!';
    }
    setInterval(passTime, 1000)
    return {
        launch: launch,
        totalPeaceTime: totalPeaceTime
    }
}
const ohNo = makeNuclearButton();

ohNo.totalPeaceTime()

// timeWithoutDestruction remains available to these functions
// But what if we wanted to limit access, say to the ability to launch?
// We can simply remove launch from the return - you can no longer run ohNo.launch()
// This is encapsualtion - keeping some data from being directly exposed.
