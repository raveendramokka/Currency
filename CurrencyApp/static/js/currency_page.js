
$(document).ready(function(){
     $('#enter_currency').val('');
     $('.header').hide();
     $('.block').hide();
     $('#btn_submit').click(function(){
       $('.header').hide();
       var EnterCurrency = $('#enter_currency').val();
       var SelectFromCurrency = $('#selectFromCurrency').val();
       var SelectToCurrency = $('#selectToCurrency').val();
       if (EnterCurrency == ''){
          alert('Please enter your currency')
       }
       else if(SelectFromCurrency == ''){
            alert('Please select from currency')
       }
       else if(SelectToCurrency == ''){
            alert('Please select to currency')
       }
       else{
           var data = {}
           data['enter_currency'] = EnterCurrency;
           data['selectFromCurrency'] = SelectFromCurrency;
           data['selectToCurrency'] = SelectToCurrency;
           currencyconvertor_API(data);
           $('#enter_currency').val('');

       }

    });
});



function currencyconvertor_API(data){

$.ajax({
           url: "/currency_converter_api",
           type: "POST",
           contentType: 'application/json',
           data: JSON.stringify(data),
           success: function(data, testStatus, jqXHR){
            var text = data['a']

           if (testStatus == 'success'){
               $('.header').show();
               $("#text").clone().appendTo(text)
                response_data = data
                renderList(response_data);
           }
           },
           error: function(response){
             alert("Error:" + response);
           }
        });
}


function renderList(data){

    var data_view = $('.view_data');
    data_view.find('tr').remove();
    var clone = $('#template .table-form-list .table-row-form').clone();
    var enter_currency = data['enter_currency']
    var convert_currency = data['convert_currency']
    var selectFromCurrency = data['selectFromCurrency']
    var selectToCurrency = data['selectToCurrency']
    $('.your-currency', clone).text(selectFromCurrency + ' : ' + enter_currency)
    $('.convert_currency', clone).text(selectToCurrency + ' : ' + convert_currency)
    data_view.append(clone);
}



