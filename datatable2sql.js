

exCOL = function (colname) {
    return function (req, res, next) {
      if(!req.excol){req.excol=[]}
        req.excol.push(colname);
        next();
    }
}
dataTableQuery2SQL = function(custom_where){
    if(custom_where=="0"||custom_where==""){custom_where=undefined;}
     return function (req, res, next) {
        var q = [];
        var col = []
        var result = " WHERE ";
        for (let i = 0; i < 100; i++) {
          if (req.body["columns[" + i + "][data]"] && req.body["columns[" + i + "][data]"] != "" && !req.excol.includes(req.body["columns[" + i + "][data]"])) {
            col.push("CAST(ISNULL(" + req.body["columns[" + i + "][data]"] + ",'') as nvarchar)")
          }
          if (req.body["columns[" + i + "][data]"] && req.body["columns[" + i + "][data]"] != "" &&
            req.body["columns[" + i + "][orderable]"] &&
            req.body["columns[" + i + "][search][value]"] &&
            req.body["columns[" + i + "][searchable]"]) {
            q.push(req.body["columns[" + i + "][data]"] + " like '%" + req.body["columns[" + i + "][search][value]"].replaceAll("'", "''") + "%'");
          }
        }
        if (req.body["search[value]"] && req.body["search[value]"] != "") {
          
          q.push(col.join("+") + " like '%" + req.body["search[value]"] + "%' ");
        }
        result += q.join(' and ');

        if(custom_where){if (result == " WHERE "){ result+=custom_where;}else{  result +=" and "+ custom_where }}
        if (result == " WHERE ") { result = ""; }
        if(req.body["length"] ==-1){req.body["length"]=10}
        result += " Order by " + req.body["columns[" + req.body["order[0][column]"] + "][data]"] + " " + req.body["order[0][dir]"] + " OFFSET " + req.body["start"] + " ROWS FETCH NEXT " + req.body["length"] + " ROWS ONLY OPTION (RECOMPILE);"
        req.dataTableQuery2SQL = result;
        next();
      }
}

  module.exports.exCOL = exCOL;
  module.exports.dataTableQuery2SQL = dataTableQuery2SQL;