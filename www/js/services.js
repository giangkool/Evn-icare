angular.module('starter.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);
angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || null;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || null);
    }
  }
}]);

angular.module('dataServices', [])
.factory('contentService', function ($resource,$localstorage) {
        var catalogs = [];
        var contents = [];
        return {
            listCatalogs: function () {
                // catalogs = $localstorage.getObject('catalogs');
                // if(catalogs == null){
                    catalogs = $resource('http://icare.bigpay.vn/content/icare/catalogs').query();
                //     $localstorage.setObject('catalogs',catalogs);    
                // }
                return catalogs;
            },
            getCatalog: function (id) {
                for(var i =0;i<catalogs.length;i++)
                {
                    if(catalogs[i].id  == id) {
                        return catalogs[i];
                    }
                }
                //return $resource('http://cds.bigpay.vn/content/icare/catalog/' + id, {}).get();
            },
            listContents: function (id) {
                contents = $resource('http://icare.bigpay.vn/content/icare/contents/' + id + '/' + $localstorage.getObject('user').user_name).query();
                // contents = $resource('http://cds.bigpay.vn/content/icare/contents/' + id + '/all').query();
                return contents;
            },
            getContent: function (catalogId, Id) {
                for(var i = 0;i<contents.length;i++)
                {
                    if(contents[i].id == Id) return contents[i];
                }
                return $resource('http://icare.bigpay.vn/content/icare/' + catalogId +'/' + Id).get();
            },
            // searchContent: function(searchdata){
            //     var user_name="all";
            //     if($localstorage.getObject('user'))
            //     {
            //         user_name=$localstorage.getObject('user').user_name;
            //     }
            //     contents =  $resource('http://evncare.bigpay.vn/content/icare/contents/'
            //     + searchdata.catalogId
            //     + '/'
            //     + user_name
            //     +'?fselect_date='
            //     + searchdata.date
            //     +'&fmonth='
            //     + searchdata.month
            //     + '&fyear='
            //     + searchdata.year
            //     + '&tselect_date='
            //     + searchdata.date2
            //     + '&tmonth='
            //     + searchdata.month2
            //     + '&tyear='
            //     + searchdata.year2).query();
            //     return contents;
            // },
            Getpower: function(searchdata){
                var user_name="all";
                if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/getpower'
                + '/'
                + user_name
                +'?fselect_date='
                + searchdata.date
                +'&fmonth='
                + searchdata.month
                + '&fyear='
                + searchdata.year
                + '&tselect_date='
                + searchdata.date2
                + '&tmonth='
                + searchdata.month2
                + '&tyear='
                + searchdata.year2).query();
                return contents;
            },
            Getmeterrecord: function(searchdata){
                var user_name="all";
                if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/getmeterrecord'
                + '/'
                + user_name
                +'?fselect_date='
                + searchdata.date
                +'&fmonth='
                + searchdata.month
                + '&fyear='
                + searchdata.year
                + '&tselect_date='
                + searchdata.date2
                + '&tmonth='
                + searchdata.month2
                + '&tyear='
                + searchdata.year2).query();
                return contents;
            },
            Getmeter: function(searchdata){
                var user_name="all";
                if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/getmeter'
                + '/'
                + user_name
                +'?fselect_date='
                + searchdata.date
                +'&fmonth='
                + searchdata.month
                + '&fyear='
                + searchdata.year
                + '&tselect_date='
                + searchdata.date2
                + '&tmonth='
                + searchdata.month2
                + '&tyear='
                + searchdata.year2
                + '&period='
                + searchdata.period).query();
                return contents;
            },
            Getinvoice: function(searchdata){
                var user_name="all";
                if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/getinvoice'
                + '/'
                + user_name
                +'?fselect_date='
                + searchdata.date
                +'&fmonth='
                + searchdata.month
                + '&fyear='
                + searchdata.year
                + '&tselect_date='
                + searchdata.date2
                + '&tmonth='
                + searchdata.month2
                + '&tyear='
                + searchdata.year2
                + '&period='
                + searchdata.period).query();
                return contents;
            },
             Getprice: function(searchdata){
                var user_name="all";
                if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/getprice'
                + '/'
                + user_name
                +'?type='
                + searchdata.type).query();
                return contents;
            },
            GetChar: function(searchdata){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/getmeterstatis'
                + '/'
                + user_name
                +'?fyear='
                + searchdata.year
                + '&tyear='
                + searchdata.year2
                + '&period='
                + searchdata.period
                ).query();
                return contents;
            },
             GetCashier: function(searchdata){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/cashiers'
                + '/'
                + user_name
                +'?latitude='
                + searchdata.lat
                + '&longtitude='
                + searchdata.long
                ).query();
                return contents;
            },
             GetContract: function(searchdata){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/invoices'
                + '/'
                + user_name
                +'?page_index='
                + searchdata.pageIndex
                ).query();
                return contents;
            },
            Getinvoices: function(searchdata){
                contents =  $resource('http://icare.bigpay.vn/content/icare/invoices'
                + '/'
                + searchdata.username
                +'?page_index='
                + searchdata.pageIndex
                ).query();
                return contents;
            },
             GetCregister: function(searchdata){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/cregister'
                + '/'
                + user_name
                +'?fullname='
                + searchdata.full_name
                +'&idCardNumber='
                + searchdata.idCard
                +'&idCardTime='
                + searchdata.idCard_Time
                +'&idCardProvince='
                + searchdata.idCard_Province
                +'&contactNumber='
                + searchdata.contact_Number
                +'&emailAddress='
                + searchdata.email_Address
                +'&provinceId='
                + searchdata.provinceId
                +'&districtId='
                + searchdata.districtId
                +'&address='
                + searchdata.address
                +'&bankAccount='
                + searchdata.bankAccount
                +'&bankName='
                + searchdata.bankName
                +'&type='
                + searchdata.type
                ).get();
                return contents;
            },
            GetEregister: function(searchdata){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/eregister'
                + '/'
                + user_name
                +'?enterpriseName='
                + searchdata.e_name
                +'&representName='
                + searchdata.full_name
                +'&taxCode='
                + searchdata.taxcode
                +'&contactNumber='
                + searchdata.mobile
                +'&emailAddress='
                + searchdata.email
                +'&provinceId='
                + searchdata.provinceId
                +'&districtId='
                + searchdata.districtId
                +'&address='
                + searchdata.address
                +'&regProvinceId='
                + searchdata.regProvinceId
                +'&regDistrictId='
                + searchdata.regDistrictId
                +'&regAddress='
                + searchdata.regAddress
                +'&bankAccount='
                + searchdata.bankAccount
                +'&bankName='
                + searchdata.bankName
                +'&type='
                + searchdata.type
                ).get();
                return contents;
            },
            Getintro: function(){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/intro'
                + '/'
                + user_name
                ).query();
                return contents;
            },
            GetCC: function(){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/cc'
                + '/'
                + user_name
                ).query();
                return contents;
            },
            GetNewscategories: function(){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/newscategories'
                + '/'
                + user_name
                ).query();
                return contents;
            },
            GetNews: function(searchdata){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/news'
                + '/'
                + user_name
                +'?id='
                + searchdata.id
                +'&Page_index='
                + searchdata.page_index
                ).query();
                return contents;
            },
            GetNewdetail: function(id){
                 var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/newdetail'
                + '/'
                + user_name
                +'?id='
                + id
                ).get();
                return contents;
            },
            Getfaq: function(){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/faq'
                + '/'
                + user_name
                ).query();
                return contents;
            },
            Getrating: function(){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/ratingservices'
                + '/'
                + user_name
                ).query();
                return contents;
            },
            Getratingdetail: function(id){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/quiz'
                + '/'
                + user_name
                + '?id='
                + id
                ).query();
                return contents;
            },
            Putrating: function(quiz){
                var user_name ="all";
                 if($localstorage.getObject('user'))
                {
                    user_name=$localstorage.getObject('user').user_name;
                }
                contents =  $resource('http://icare.bigpay.vn/content/icare/putquiz'
                + '/'
                + user_name
                + '?quiz='
                + quiz
                ).get();
                return contents;
            },
            GetinvoiceDetail: function(customerid) {
               contents = $resource('http://billing.bigpay.vn/home/evn/hanoi/'+customerid+'/detail').get();
                return contents;
            },
            debt_tiles: function(searchdata){
                contents =  $resource('http://billing.bigpay.vn/home/evn/hanoi'
                + '/'
                + searchdata.customerid
                + '/pay?amount='
                + searchdata.amount
                + '&payment_note='
                + searchdata.note
                ).get();
                return contents;
            } 
        }
    })
    .factory('apiService', function ($http) {
        return {
            postLogin: function (username, password) {
                return $http.get('http://icare.bigpay.vn/id/login/icare?username=' + username + '&password=' + password);
            },
             auth: function (big_user, big_password) {
                    return $http.get('http://bigpay.vn/api/sandbox/auth/' + big_user + '/' + big_password );  
            },
             pay: function (profile_id, merchant_code, merch_txn_ref, amount, payment_provider) {
                 return $http.get('http://bigpay.vn/api/sandbox/pay/ECOM/' + merchant_code + '/' + merch_txn_ref
                + '/?profile_id=' + profile_id
                +'&amount=' + amount
                + '&payment_provider=' + payment_provider
                + '&bank='
                );
            },
            comfirm: function (transaction_type, trans_id, profile_id, amount, otp) {
                return $http.get('http://bigpay.vn/api/sandbox/confirm/' + transaction_type + '/' + trans_id
                + '/?profile_id=' + profile_id
                + '&amount=' + amount
                + '&otp=' + otp
                );
            },
             create_transaction: function(transaction) {
                // var user_info = $localstorage.getObject('user_info');
                var id = "huynq@payflow.vn";
                // console.log('user:',user_info);
                // if(user_info != null) id= transaction.customer_ref;
                var url = 'http://api.bigpay.vn/transaction/create/bigpay_2.0.0.0/' + id + '/?transaction=' + transaction + "&sign=";
                var auth_response = $http.get(url);
                console.log('resp:', auth_response);
                return auth_response;
            },
        }
    });