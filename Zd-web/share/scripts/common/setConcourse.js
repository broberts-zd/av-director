
function setConcourse() {
        /*clear out the main_content and set up columns to contain this panel*/
        var e = document.getElementById("main_content");
        e.innerHTML = '';
        var t = new oblTable(1,2);
        t.setCellClass(0,0,"panel_column_left");
        t.getCell(0,0).id = "concourse_left";
        t.getCell(0,1).id = "concourse_right";
        e.appendChild(t.getTable());
}
