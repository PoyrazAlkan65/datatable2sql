//TR
/*
Bu modül datatable için express.js üzerinde ajax yaparken search parametrelerini yönetmek ve sql cümleciği hazırlamak için geliştirilmiştir.
https://datatables.net/ acık kaynak kodlu bir veri listeleme ve tablo yönetim aracıdır.
https://expressjs.com/  Node js için geliştirilmiş hızlı, yönlendirme yapmayan, minimalist bir web geliştirme ortamıdır.
Geliştiren:Poyraz Alkan 
*/
Kullanım şekli aşağıdaki gibidir.

Önyüzde:

<style>
    thead {
        background-color: #484848;
        color: white;
        font-size: 14px;
    }

    tfoot {
        background-color: #484848;
        color: white;
        font-size: 14px;
    }

    .center {
        text-align: center;
    }

    table.dataTable.stripe tbody tr.odd,
    table.dataTable.display tbody tr.odd {
        background-color: #e0e0e0;
    }

    .select2-container--default .select2-selection--single {
        height: 40px !important;
    }

    #example tbody td {
        /**/
    }

    .my_class {
        white-space: nowrap;
    }

    .table.dataTable tfoot th,
    table.dataTable tfoot td {
        padding: 10px 18px 6px 7px !important;
    }
</style>
<h1 class="pagetitle">ÖĞRENCİLER</h1>
<div style="margin-bottom: 20px;text-align: right;">
    <a id="newogrenci" data-id="new" href="#">Yeni Kayıt</a>
</div>
<table style="margin-top: 40px;" id="example" class="display" style="width:100%">
    <thead>
        <tr>
            <th></th>
            <th>Öğrenci Adı</th>
            <th style="width: 10%;">Öğrenci Telefonu</th>
            <th>Okuduğu Okul</th>
            <th>Sınıf Seviyesi</th>
            <th>E Posta</th>
            <th>Kullanıcı</th>
            <th>Son İşlem Tarihi</th>
            <th>Veli Adı</th>
            <th style="width: 10%;">Veli Telefonu</th>
            <th>Veli Mesleği</th>
            <th>Tutar Bilgisi</th>
            <th>İşlem Yeri</th>
            <th>Durum</th>
            <th style="visibility: hidden;">Durum2</th>
            <th>Açıklama</th>
            <th>Düzenle</th>
        </tr>
    </thead>
    <tbody>

    </tbody>
    <tfoot>
        <tr>
            <th></th>
            <th class="searchintotext">Öğrenci Adı</th>
            <th class="searchintotext" style="width: 10%;">Öğrenci Telefonu</th>
            <th class="searchintotext">Okuduğu Okul</th>
            <th class="searchintotext">Sınıf Seviyesi</th>
            <th class="searchintotext">E Posta</th>
            <th class="searchintotext">Kullanıcı</th>
            <th class="searchintotext">Son İşlem Tarihi</th>
            <th class="searchintotext">Veli Adı</th>
            <th class="searchintotext" style="width: 10%;">Veli Telefonu</th>
            <th class="searchintotext">Veli Mesleği</th>
            <th class="searchintotext">Tutar Bilgisi</th>
            <th class="searchintotext">İşlem Yeri</th>
            <th class="searchintotext">Durum</th>
            <th style="visibility: hidden;">Durum2</th>
            <th>Açıklama</th>
            <th>Düzenle</th>

        </tr>
    </tfoot>
</table>


</div>
<script>

    var mytable = $('#example').DataTable({

            paging: true,
            searching: true,
            pageLength: Math.floor(($(window).height() - 50) / 50),
            ordering: true,
            info: true,
            processing: true,
            serverSide: true,
            order: [[7, "desc"]],
            dom: "Bfrtip",
            ajax: {
                url: "/GWAD_Ogrenciler",
                type: "POST"
            },
            //data: data["ListData"],
            bSortClasses: false,
            responsive: {
                details: {
                    renderer: function (api, rowIdx, columns) {
                        var data = $.map(columns, function (col, i) {
                            return col.hidden ?
                                '<tr class="col-md-3" data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                                '<td>' + col.title + ':' + '</td> ' +
                                '<td>' + col.data + '</td>' +
                                '</tr>' :
                                '';
                        }).join('');

                        return data ?
                            $('<table style="width:100%"/>').append(data) :
                            false;
                    }
                }
            },
            pagingType: "full_numbers",
            bInfo: false,
            oLanguage: {
                "sSearch": "Ara",
                "sLengthMenu": "Göster _MENU_ Sayfa",
                "oPaginate": {
                    "sFirst": "İlk", // This is the link to the first page
                    "sPrevious": "Geri", // This is the link to the previous page
                    "sNext": "İleri", // This is the link to the next page
                    "sLast": "Son" // This is the link to the last page
                }
            },
            columns: [
                {
                    "data": "Photo_Url",
                    "render": function (data, type, row, meta) {
                        var testdata = {}

                        data = '<img style="width: 40px;height: 40px; border-radius: 40px;" src="{{settings.imagesUrl}}wwwroot/images/' + data + '" alt="">';
                        return data;
                    }
                },
                {
                    "data": "Ogrenci_Adi",
                    "className": "my_class"
                },
                {
                    "data": "Ogrenci_Tel",
                    "render": function (data, type, row, meta) {
                        debugger;
                        if (userdata.ParametreData.ParemetreName == "mask") {
                            var telmask;
                            var testdata = {}
                            telmask = data.substring(5, 6) + "XXXXXX" + data.substring(17, 19);
                            var data = "<th>" + telmask + "</th>"
                        }
                        return data;
                    },
                    "className": "my_class"
                },
                {
                    "data": "Okudugu_Okul",
                    "className": "my_class"
                },
                {
                    "data": "Sinif_Seviyesi",
                    "render": function (data, type, row, meta) {
                        debugger;
                        if (data == 0) {
                            data = '<th> Anasınıfı </th>';
                            return data;
                        }
                        if (data != null) {
                            data = '<th> ' + data + '. Sınıf </th>';
                            return data;
                        }
                        else {
                            data = '<th> - </th>';
                            return data;
                        }
                        //var tarih = formatDate(data);

                    },
                    "className": "my_class center"
                },
                {
                    "data": "EPosta",
                    "className": "my_class"
                },
                {
                    "data": "İslem_Yapan_K",
                    "className": "my_class"
                },
                {
                    "data": "Son_Islem_Tarihi",
                    "render": function (data, type, row, meta) {
                        var tarih = formatDate(data);
                        data = '<span> ' + tarih + ' </span>';
                        return data;
                    },
                    "className": "my_class",
                },
                {
                    "data": "Veli_Adi",
                    "className": "my_class"
                },
                {
                    "data": "Veli_Tel",
                    "render": function (data, type, row, meta) {
                        debugger;
                        if (userdata.ParametreData.ParemetreName == "mask") {
                            var telmask;
                            var testdata = {}
                            telmask = data.substring(5, 6) + "XXXXXX" + data.substring(17, 19);
                            var data = "<th>" + telmask + "</th>"
                        }
                        return data;
                    },
                    "className": "my_class"
                },
                {
                    "data": "Veli_Meslegi",
                    "className": "my_class"
                },
                {
                    "data": "Tutar_Bilgisi",
                    "visible": false,
                    "className": "my_class"
                },
                {
                    "data": "İslem_Yeri"
                },
                {
                    "data": "OgrencilerDurum",
                    "responsivePriority": "2",
                    "render": function (data2, type, row, meta) {
                        var deneme = " ";
                        var renk = "#00a200";
                        var uzunluk = data.ParametreData.length;

                        var seviye = data.ParametreData.filter(x => x.ParemetreCategory == "Kayıtlar" && x.ParemetreName == data2);
                        if (seviye.length != 0) {
                            if (seviye[0].Seviye == "Orta") {
                                renk = "#c3b400";
                            }
                            if (seviye[0].Seviye == "Yüksek") {
                                renk = "#c30000";
                            }
                        }
                        for (var i = 0; i < uzunluk; i++) {
                            var s = ""
                            debugger;
                            if (row.İslem_Durumu == data.ParametreData[i].ParemetreName) {
                                s = 'selected="selected"';
                            }
                            deneme += '<option opt-id=' + row.id + ' value=' + data.ParametreData[i].ParemetreName + ' ' + s + '> ' + data.ParametreData[i].ParemetreName + ' </option>'
                        }

                        //$("option[value="+data2+"][opt-id="+row.id+"]").attr("selected","selected");
                        donus = '<select data-id=' + row.id + ' row-id=' + meta.row + ' class="parametredegerOgr" style=" border-bottom: 5px solid ' + renk + '"> ' +
                            '' + deneme + '' +
                            '</select>';

                        return donus;
                    }
                },
                {
                    "data": "OgrencilerDurum",
                    "visible": false,
                    "render": function (data2, type, row, meta) {
                        donus = '<h1 data-value=' + data2 + ' data-id=' + row.id + '>' + data2 + '' +
                            '</h1>';

                        return donus;
                    }
                },
                {
                    "data": "Aciklama",
                    "className": "my_class"
                },
                {
                    "data": "EDİT",
                    "responsivePriority": "1",
                    "searchable": false,
                    "render": function (data, type, row, meta) {
                        var testdata = {}

                        data = '<a href="#" data-id="' + row.id + '" class="editor_edit"><img style="width: 20px;height: 20px;margin-left:7px;cursor:pointer;" src="http://80.93.220.117:1881/Bilgin_Okullari/wwwroot/images/edit-icon.png" alt=""></a>';
                        return data;
                    }
                }
            ]
        });
        //}
        //else {
        //  $('#example').DataTable();
        // }




        $(".js-example-placeholder-single").select2({
            placeholder: "Select a state",
            allowClear: true
        });



        $('#example tfoot .searchintotext').each(function () {
            var title = $(this).text();
            $(this).html('<input style="width: 100%;background-color: #ddd;border: none;outline: none;padding: 4px;" type="text" placeholder="Ara" />');
        });
        // Apply the search
        mytable.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change clear', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    });
</script> 

Node.js içerinde ise kullanımı aşağıdaki gibidir.
var d2sql = require("./datatable2sql");
şeklinde tanımlanır ve sonrasında olay tabanlı arakatman olarak kullanılır.

app.post('/GWAD_Ogrenciler',d2sql.exCOL('EDİT'), d2sql.dataTableQuery2SQL("Is_deleted=0"), function (req, res) {
  runSQL("select * from Ogrenciler " + req.dataTableQuery2SQL, null, function (result) {
    res.send({ data: result.recordset });
  });
});

Kullanım Detayları
//d2sql.exCOL('EDİT') =========>>>>>> EDİT isimli kolonu cümlecik oluştururken hariç tut.
//d2sql.exCOL ara katmanı birden fazla kolon için kullanılacaksa bir kolon isimlerinden oluşan array gönderilebilir. 
//d2sql.exCOL(['EDİT','OgrencilerDurum']) gibi

//d2sql.dataTableQuery2SQL("Is_deleted=0") =========>>>>>> oluşacak olan cümleye "Is_deleted=0" koşulunuda dahil et.

 

