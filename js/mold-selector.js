$(function(){
    //금형 데이터 받아오기
    $.ajax({
        //url: serverURL + "mold/search",
        url: "http://dyict.pluger.com:8888/mold/search",
        type: 'post',
        data: {
            col: 'fiUID',
            //val: localStorage.getItem('fiUID')
            val: '10000001'
        },
        dataType: 'json',
        success: function (data) {
            for(var i = 0; i < data.length; i++) {
                $('.listBody').append('<tr><td class="listItem" value="'+data[i]['fmUID']+'">'+data[i]['moldType']+'</td></tr>');
                // console.log(data[i]['fmiUID']);
            }
        }, error: function() {
            alert("금형 데이터를 불러오는 도중 에러가 발생했습니다.");
        }
    });
    
    //금형리스트 크기 조절 함수
    function listSize(dnCnt, findeValue){
        if(dnCnt<=7&&dnCnt>=1){
            var bodyInt = parseInt($(".listBody").css("height"));
            var itemInt = parseInt($(".listItem").css("height"));
            var padBtm = bodyInt-(itemInt*dnCnt);
            $(findeValue).not('.dn').css("padding-bottom","0px");
            $(findeValue).not('.dn').eq(dnCnt-1).css("padding-bottom",padBtm+"px");
        }
        else{
            var itemInt = parseInt($(".listItem").css("height"));
            $(findeValue).not('.dn').css("padding-bottom","0px");
        }
    }

    //목록의 개수를 카운트하여 검색 금형이 없음을 나타냄
    function cntItem(dnCnt){
        var dnCnt;
        if(dnCnt==0){
            $('.listBody').append('<tr><td class="listItem no">선택할수있는<br/>금형이없습니다.</td></tr>');
        }
        else{
            $('.no').remove();
        }
    }

    // 키보드 입력하여 검색, 금형 목록 축약 - 검색함수
    function findItem(){
        var searchValue = inputTarget.val();
        var findeValue = document.getElementsByClassName('listItem');
        var dnCnt = 0;
        for(var i=0;i<$(findeValue).length; i++){
            var search = new RegExp(searchValue.toUpperCase());
            if($(findeValue).eq(i).html().toUpperCase().match(search) !== null){
                $(findeValue).eq(i).removeClass("dn");
            }
            else{
                $(findeValue).eq(i).addClass("dn");
            }
            
            if(!$(findeValue).eq(i).hasClass("dn")){
                dnCnt++;
            }
        }
        cntItem(dnCnt);
        listSize(dnCnt, findeValue);
    }

    //Enter키 클릭시 입력창의 값을 mold-selector창에 적용후 검색창 닫기
    function inputItem(){
        $('li.return').click(function(){
            var inputType = $('.lightInput').val();
            var inputValue = $('#k_val_no').val();
            $('#mold-selector_view').val(inputType);
            $('#mold-selector').attr('value', inputValue);
            allHide();
        });
    }

    // 금형 검색기 열기 및 데이터 불러오기
    function allShow(){
        $('.lightBox, .lightBg, .listBox, #keyboard').show();
    }

    // 금형 검색기 닫기 및 초기화
    function allHide(){
        $('.lightBox, .lightBg, .listBox, #keyboard').hide();
        cntItem(1);
        $('.listItem').css("padding-bottom","0px");
    }

    //제이쿼리 키보드 플러그인 기본 설정
    var inputTarget = $('.lightInput');
    $('#keyboard').jkeyboard({
        input: inputTarget
    });
    
    // 검색기 배경, 닫기버튼 클릭시 닫기
    $('.lightClose, .lightBg').click(function(){
        allHide();
    });

    //금형 검색 클릭시 열기 및 검색값 초기화
    $('.seletorBtn').click(function(){
        allShow();
        $('#mold-selector').val("");
        $('.lightInput').val("");
        $('.listItem').removeClass('dn');
    })
  
    // 금형 리스트 클릭시 입력창에 금형 품번 값 추가
    $(document).on('click', '.listItem', function(){
        var mold_type = $(this).html();
        var mold_Id = $(this).attr("value");
        $('.lightInput').val(mold_type);
        $('#k_val_no').val(mold_Id);
    });
    
    
    //키보드 클릭시 함수 적용
    $('li.jkey:not("li.return")').click(function(){ //가상키보드클릭
        findItem();
    });
    $('.lightInput').keyup(function (e) { //키보드입력
        findItem();
    });
    $('li.return').click(function(){    //Enter 클릭시 mold-selector에 값 적용
        inputItem();
    });
});