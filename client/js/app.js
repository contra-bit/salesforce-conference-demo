function getFLugList(success, error) {
  var soql = "SELECT Flug__r.Id, Flug__r.Name FROM Flug_Pilot__c";
  force.query(soql, success, error);
}

function getFlugDetails(flugId, success, error) {
  var soql = "SELECT Flug__r.Name, " +
  "Flug__r.Session_Date__c, " +
  "Pilot__r.Vorname__c, " +
  "Pilot__r.Nachname__c " +
  "FROM Flug_Pilot__c " +
  "WHERE Flug__r.Id = '" + flugId + "'";
  force.query(soql, success, error);
}

function showFlugList() {
    getFLugList(
        function (data) {
            var flugs = data.records,
                html = '';
            for (var i=0; i<flugs.length; i++) {
                html += '<li class="table-view-cell"><a href="#flugs/'+ flugs[i].Flug__r.Id +'">' + flugs[i].Flug__r.Name + '</a></li>';
            }
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                    '<h1 class="title">Flugs</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view flug-list">' + html + '</ul>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showFlugDetails(flugId) {

    getFlugDetails(flugId,
        function (data) {
            var flug = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">Flugs</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>' + flug.Flug__r.Name + '</h4>' +
                                '<p>' + (flug.Flug__r.Flug_Date__c || 'No time yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">Pilot: ' +
                                flug.Pilot__r.Vorname__c +
                            '</li>' +
                            '<li class="table-view-cell">' +
                                (flug.Flug__r.Beschreibung__c || 'No description yet') +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showFlugList);
router.addRoute('flugs/:id', showFlugDetails);
