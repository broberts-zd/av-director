
function whackNode(parent,child) {
        var p = document.getElementById(parent);
        var c = document.getElementById(child);

        p.removeChild(c);
}
