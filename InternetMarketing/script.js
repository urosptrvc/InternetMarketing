$(document).ready(function () {
    $('.menu-toggle').click(function () {
        $('.navigacija ul').toggleClass('show');
    });
});

$(document).ready(function() {

    var fulldata = document.getElementById('content');
    var cont = '';


    function ProveraCheckboxa() {
        var isChecked = $('#myonoffswitch').prop('checked');
        if (isChecked) {
            $("#content").addClass("row");
            $("#content").removeClass("showKlasa");
            setTimeout(function() {
                $("#content").addClass("showKlasa");
            }, 300);
            cont = '';
            fetch('src/db.json') .then(response => response.json()) 
            .then(MyJSON => {
                $.each(MyJSON.socialmedias, function(index,data){
                    cont += `<div style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3); height: 100%;" class="card card-profile text-center">
        
                                    <div class="container-fluid" style="height: 190px;">
                                        <div class="row">
                                            <div class="imemreze col-12" style="background-color: ${data.color}; height: 120px;">
                                                <h4 class="imemreze">${data.name}</h4>
                                            </div>
                                            <div class="col-12" style="background-color: ${data.lighter_color}; height: 70px;"></div>
                                        </div>
                                    </div>
                            
                                    <div class="card-block">
                                    <img alt="" class="card-img-profile" src="${data.logo}" style="background-color: white;">
                                    </div>
                            
                                    <div style="height:100%" class="text-center container data">
                                        <p><b>Monthly users:</b> ${data.monthly_users}</p>
                                        <p><b>Daily users:</b> ${data.active_users_daily}</p>
                                        <p><b>Current popularity:</b> ${data.current_popularity}</p>
                                        <p><b>Created:</b> ${data.founded}</p>
                                        <p><b>Total revenue:</b> $${data.total_revenue}</p>
                                    </div>
                            
                                    <div class="container" style="height: 80px;">
                                        <div class="row">
                                            <div class="col-12" style="background-color: ${data.color}; height: 40px; color: white; display: flex; justify-content: center; align-items: center;">
                                                <a style="text-decoration: none; color: inherit;" href="${data.link}" >${data.link}</a>
                                            </div>
                                            <div class="col-12" style="background-color: ${data.lighter_color}; height: 40px;">
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                });
                fulldata.innerHTML = cont;
            });
        } else {
            $("#content").removeClass("row");
            $("#content").removeClass("showKlasa");
            setTimeout(function() {
                $("#content").addClass("showKlasa");
            }, 300);
            cont = '';

            fetch('src/db.json') .then(response => response.json()) 
            .then(MyJSON => {
                MyJSON.socialmedias.sort((a,b) => parseFloat(b.monthly_users) - parseFloat(a.monthly_users));
                var max = parseFloat(MyJSON.socialmedias[0].monthly_users);
                var max2 = parseFloat(MyJSON.socialmedias[0].total_revenue);
                console.log(max2)
                $.each(MyJSON.socialmedias, function(index,data){
                    
                    cont += `<div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="height: 60px; margin-bottom: 3px;">
                                <div class="progress-bar" style="width: ${(parseFloat(data.monthly_users)/max)*100}%; background-color: ${data.color};  font-size: 12pt;">${data.name} - ${data.monthly_users} Monthly Users</div>
                            </div>

                            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="height: 50px; margin-bottom: 3px;">
                                <div class="progress-bar" style="width: ${(parseFloat(data.active_users_daily)/max)*100}%; background-color: ${data.lighter_color};  font-size: 8pt;"> Active users daily - ${(parseFloat(data.active_users_daily)/parseFloat(data.monthly_users)*100).toFixed(0)}%</div>
                            </div>

                            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="height: 20px; margin-bottom: 15px;">
                                <div class="progress-bar" style="width: ${(parseFloat(data.total_revenue)/max2)*100}%; background-color: ${data.color};  font-size: 8pt;"> Revenue - ${data.total_revenue}</div>
                            </div>`
                });
                fulldata.innerHTML = cont;
            });
        }
    }
    



     $('#myonoffswitch').change(ProveraCheckboxa);
     ProveraCheckboxa();
});