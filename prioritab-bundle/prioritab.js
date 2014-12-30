// Other Prioritab scripts

chrome.storage.sync.set({
    'prioritab-value-test': 'blah'
}, function() {
    console.log('logged');
});

var test = "asdf";
console.log(test)

chrome.storage.sync.get('prioritab-value-test', function(result) {
    console.log(result['prioritab-value-test']);
    test = result['prioritab-value-test'];
});

console.log(test);

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});

function GetTime() {
    var prettyTime = moment().format("h:mm:ss A");
    document.getElementById('clockbox').innerHTML = prettyTime;
}

function GetDate() {
    var dayOfWeek = moment().format('dddd'),
        prettyDate = moment().format("MMM D, YYYY");

    document.getElementById('daybox').innerHTML = dayOfWeek;
    document.getElementById('datebox').innerHTML = prettyDate;
}

function CountdownDay() {
    var now = new Date(),
        todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        progressMS = now - todayStart,
        totalDayMS = 24 * 60 * 60 * 1000,
        progressPCT = progressMS / totalDayMS * 100,
        prettyPCT = Math.round(progressPCT);

    document.getElementById('countdown-day-amount').innerHTML = prettyPCT + "%";
}

function CountdownMonthYear() {
    var now = new Date(),
        monthStart = new Date(now.getFullYear(), now.getMonth(), 1),
        progressMonthMS = now - monthStart,
        totalMonthMS = moment().daysInMonth() * 24 * 60 * 60 * 1000,
        monthProgressPCT = progressMonthMS / totalMonthMS * 100,
        prettyMonthPCT = Math.round(monthProgressPCT),
        yearStart = new Date(now.getFullYear(), 0, 1),
        progressYearMS = now - yearStart,
        totalYearMS = 365 * 24 * 60 * 60 * 1000,
        yearProgressPCT = progressYearMS / totalYearMS * 100,
        prettyYearPCT = Math.floor(yearProgressPCT);

    document.getElementById('countdown-month-amount').innerHTML = prettyMonthPCT + "%";
    document.getElementById('countdown-year-amount').innerHTML = prettyYearPCT + "%";
}

window.onload = function() {
    GetTime();
    GetDate();
    CountdownDay();
    CountdownMonthYear();
    setInterval(GetTime, 1000);
    setInterval(CountdownDay, 900000);

    $('.edit-priorities-link').click(function(e) {
        $('.edit-priorities').each(function(index) {
            $(this).hide();
            $(this).siblings('.edit-priorities-link').fadeIn();
        });
        $(this).hide();
        prioritiesList = $(this).siblings('.edit-priorities')[0];
        $(prioritiesList).fadeIn();
        $(prioritiesList).find('input.todo').focus();
    });

    $('.hide-edit').click(function(e) {
        $(this).parent().hide();
        $(this).parent().siblings('.edit-priorities-link').show();
    });
};