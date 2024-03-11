// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  $(document).ready(function () { //This is to display the current date and time at the top of the page
    function updateCurrentTime() {
        var now = dayjs().format('dddd, MMMM D, YYYY h:mm A');
        $('#currentDay').text(now);
    }

    function createTimeBlocks() { //This section is to create the blocks from 9am to 5pm
        var startHour = 9;
        var endHour = 17;
        var container = $('.container-fluid');
    
        for (var hour = startHour; hour <= endHour; hour++) {
            var hour12 = hour <= 12 ? hour : hour - 12;
            var amPm = hour < 12 ? 'AM' : 'PM';
            var timeString = hour12 + ' ' + amPm;
    
            var timeBlock = $('<div></div>').addClass('row time-block').attr('id', 'hour-' + hour);
            var timeDisplay = $('<div></div>').addClass('col-2 col-md-1 hour text-center py-3').text(timeString);
            var textArea = $('<textarea></textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
            var saveButton = $('<button></button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
            var saveIcon = $('<i></i>').addClass('fas fa-save').attr('aria-hidden', 'true');
    
            saveButton.append(saveIcon);
            timeBlock.append(timeDisplay, textArea, saveButton);
            container.append(timeBlock);
        }
    }
    function updateBlockClasses() {  //This is to update the classes based on the current time
        var currentHour = dayjs().hour();
    
        $('.time-block').each(function () {
            var blockHour = parseInt($(this).attr('id').replace('hour-', ''), 10);
    
            $(this).removeClass('past present future');
    
            if (blockHour < currentHour) {
                $(this).addClass('past');
            } else if (blockHour === currentHour) {
                $(this).addClass('present');
            } else {
                $(this).addClass('future');
            }
        });
    }

    $(document).on('click', '.saveBtn', function () { // This is the save button click event
        var parentBlock = $(this).closest('.time-block');
        var hourId = parentBlock.attr('id');
        var description = parentBlock.find('.description').val();
        localStorage.setItem(hourId, description);
    });

    function loadEvents() { //This is to save your data locally after you put your information in
        $('.time-block').each(function () {
            var hourId = $(this).attr('id');
            var savedDescription = localStorage.getItem(hourId);
            if (savedDescription) {
                $(this).find('.description').val(savedDescription);
            }
        });
    }

    $('.saveBtn').hover( //This is just a hover effect for when you are over the save button
        function() { $(this).animate({ fontSize: '1.25em' }, 200); },
        function() { $(this).animate({ fontSize: '1em' }, 200); }
    );

    var hour = dayjs().hour(); //This was added to make a dynamic background color for the header based on the time of day
    if(hour < 12) {
        $('header').css('background-color', '#87CEEB');
    } else if(hour < 18) {
        $('header').css('background-color', '#FFD700');
    } else {
        $('header').css('background-color', '#2F4F4F');
    }

    updateCurrentTime();
    setInterval(updateCurrentTime, 60000);
    createTimeBlocks();
    updateBlockClasses();
    setInterval(updateBlockClasses, 60000);
    loadEvents();
});
