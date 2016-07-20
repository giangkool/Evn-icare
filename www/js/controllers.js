angular.module('starter.controllers', ['ionic', 'ngCordova', 'ngResource', 'ngSanitize', 'ionic.utils', 'dataServices', 'chart.js'])

    .controller('AppCtrl', function ($scope, $rootScope, $ionicHistory, $ionicModal, $timeout, $cordovaAppVersion, $state, $localstorage, $location, $window, apiService, contentService) {

        ionic.Platform.ready(function () {
            // $cordovaAppVersion.getVersionNumber().then(function (version) {
            //     $rootScope.version_info = "v." + version;
            // });

            // $cordovaAppVersion.getAppName().then(function (name) {
            //     $rootScope.name_info = name;
            // });
        }, false);

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $ionicModal.fromTemplateUrl('templates/support/complete.html', {
            scope: $scope
        }).then(function (complete) {
            $scope.complete = complete;
        });

        // Triggered in the login modal to close it
        $scope.closecomplete = function () {
            $scope.complete.hide();
        };
        // Open the login modal
        $scope.rcomplete = function () {
            $scope.complete.show();
        };
        /////////////////////////////////
        $ionicModal.fromTemplateUrl('templates/done.html', {
            scope: $scope
        }).then(function (dpopup) {
            $scope.dpopup = dpopup;
        });

        // Triggered in the login modal to close it
        $scope.closedone = function () {
            $scope.dpopup.hide();
        };
        $scope.catalogs = contentService.listCatalogs();
        // Open the login modal
        $scope.done = function () {
            $scope.dpopup.show();
        };
        ///////////////////////////////

        $ionicModal.fromTemplateUrl('templates/about.html', {
            scope: $scope
        }).then(function (apopup) {
            $scope.apopup = apopup;
        });

        // Triggered in the login modal to close it
        $scope.closeabout = function () {
            $scope.apopup.hide();
        };
        $scope.catalogs = contentService.listCatalogs();
        // Open the login modal
        $scope.about = function () {
            $scope.apopup.show();
        };
        ///////////////////////////////

        $ionicModal.fromTemplateUrl('templates/messagebox.html', {
            scope: $scope
        }).then(function (mpopup) {
            $scope.mpopup = mpopup;
        });

        // Triggered in the login modal to close it
        $scope.closepopup = function () {
            $scope.mpopup.hide();
        };
        $scope.catalogs = contentService.listCatalogs();
        // Open the login modal
        $scope.popup = function () {
            $scope.mpopup.show();
        };
        ///////////////////////////////

        // Form data for the login modal
        $scope.changePassData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/changepass.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeChangePass = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.changePass = function () {
            $scope.modal.show();
        };
        $scope.signIn = function (user) {
            apiService.postLogin(user.username, user.password).then(function (response) {
                $scope.result = response.data;
                if ($scope.result.full_name) {
                    $scope.isLogin = false;
                    $localstorage.setObject('user', $scope.result);
                    // $window.location.reload(true);
                    $state.go('app.home');
                    return;
                }
                else {
                    $scope.error_message = "Sai thông tin đăng nhập";
                }
            }, function (error) {
                console.log('opsssss' + error);
                $scope.error_message = "Có lỗi trong quá trình xử lý";
            });
        };
        // Perform the login action when the user submits the login form
        $scope.doChangePass = function () {
            console.log('Doing change pass', $scope.changePassData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeChangePass();
            }, 1000);
        };

        //logout
        $scope.signOut = function () {
            // $window.localStorage.clear();
            $window.localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            console.log("Clean storage");
            $scope.isLogin = true;
            $state.go('app.login', {}, { reload: true });
        }
        $scope.user = $localstorage.getObject('user');
        if ($scope.user) {
            $scope.isLogin = false;
        }
        else {
            $scope.isLogin = true;
            $state.go('app.login', {}, { reload: true });
        }
    })

    .controller('HomeCtrl', function ($scope, $state, $location, $localstorage, $window) {
        $scope.isLogin = false;
        $scope.user = $localstorage.getObject('user');
        if ($scope.user) {
        }
        else {
            //$scope.isLogin =true;
            $state.go('app.login', {}, { reload: true });
        }
    })

    .controller('InfoCtrl', function ($scope, $location, contentService) {
        $scope.isLogin = false;
        console.log($scope.isLogin);
        $scope.title = {
            title: 'Tra cứu thông tin',
            icon: 'ios-information'
        };
        // $scope.catalogs = contentService.listCatalogs();
    })

    .controller('PaymentCtrl', function ($scope, $location, contentService) {
        $scope.isLogin = false;
        console.log($scope.isLogin);
        $scope.title = {
            title: 'Thanh toán',
            icon: 'card'
        };

        $scope.catalogs = [
            { title: 'Thanh toán trực tuyến', id: 1, icon: 'card', href: '#/app/unservice' },
            { title: 'Thanh toán PayNOW', id: 2, icon: 'social-facebook', href: '#/app/unservice' },
            { title: 'Thanh toán tại địa chỉ', id: 3, icon: 'home', href: '#/app/unservice' }
        ];
    })
    .controller('EpaymentpayCtrl', function ($scope, $state, $location, $ionicLoading, $localstorage, $stateParams, apiService, contentService) {
        var info = $localstorage.getObject('user');
        //  $scope.customerIid = info.user_name;
        $scope.user = {};
        $scope.user.customerId = info.user_name;
        $scope.pay = false;

        $scope.pay_do = function (user) {
           $localstorage.setObject('cusId', user.customerId);
           $state.go('app.epaymentpaydetail', {}, {reload:true})
            // var search_data = {};
            // search_data.pageIndex = 1;        
            // search_data.username = user.customerId;

            
            // if(!search_data.username)
            // {
            //     user.customerId = info.user_name;
            //     apiService.postLogin(search_data.username, search_data.username, user.platform, user.uuid).then(function (response) {
            //         $scope.result = response.data;
            //         if ($scope.result) {
            //             console.log($scope.result);
            //             $scope.user = $scope.result;
            //             $scope.pay = true;
            //         }
            //         else {
            //             $scope.error_message = "Sai thông tin đăng nhập";
            //         }
            //     }, function (error) {
            //         console.log('opsssss' + error);
            //         $scope.error_message = "Có lỗi trong quá trình xử lý";
            //     });
            // }
            // else
            //     {
            //         apiService.postLogin(user.customerId, user.customerId, user.platform, user.uuid).then(function (response) {
            //         $scope.result = response.data;
            //         if ($scope.result) {
            //             console.log($scope.result);
            //             $scope.user = $scope.result;
            //             $scope.pay = true;
            //         }
            //         else {
            //             $scope.error_message = "Sai thông tin đăng nhập";
            //         }
            //     }, function (error) {
            //         console.log('opsssss' + error);
            //         $scope.error_message = "Có lỗi trong quá trình xử lý";
            //     });   
            //     }
        }
    })

    .controller('Epaymentpay2Ctrl', function ($scope, $state, $location, $ionicLoading, $localstorage, $stateParams, apiService, contentService) {
        var _Id = $localstorage.getObject('cusId');
        if(_Id)
        {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Đang tải dữ liệu'
            });
            $scope.invoices = contentService.GetinvoiceDetail(_Id);
            console.log($scope.invoices);
            if ($scope.invoices) {
                $ionicLoading.hide();
            }
        }
    })
    .controller('EpaymentpaytabCtrl', function ($scope, $sce, $state, apiService, $ionicLoading, $localstorage, $location, $window, $stateParams, contentService) {
        
        var tmp = $stateParams.amount;
        var money = tmp.replace(",", "");
        $scope.amount = $stateParams.amount;
        $scope.search_data = {};
        $scope.search_data.user = '';
        $scope.search_data.pass = '';
        var merchant = "TESTMERCHANT";
        var return_url = "http://localhost:800/ntg/mobil_final/www/#/tab/payment";

                var trans_confirm_info = {};
                trans_confirm_info.merchant = 'bigpay';
                // trans_confirm_info.provider = {code:"evnhn",name:'EVN Hà Nội'};
                trans_confirm_info.service = {code: "payment", name:'Thanh toán điện tử'};
                trans_confirm_info.sub_service = {code:"billing",name:'Thanh toán hoá đơn'};
                trans_confirm_info.customer = {
                    name: "CUSTOMER "+$stateParams.customerid,
                    mobile: "", //ma hoa don
                    email: ""
                };
                // trans_confirm_info.customer_ref = $stateParams.customerid;//mã khách hàng
                trans_confirm_info.note = "thanh toán tiền điện";
                // trans_confirm_info.system_note = "Thanh toán " + $stateParams.amount + ' cho hóa đơn '
                // + $stateParams.customerid + ' ("thanh toán tiền điện")';
                trans_confirm_info.amount = $stateParams.amount;//So tien thanh toan
                trans_confirm_info.detail = {
                    amount: $stateParams.amount,
                    bill_info: $stateParams.customerid, //ma hoa don
                    bill_provider: "EVNHN"
                };
                trans_confirm_info.status = {code:"waiting",name:'chờ xác nhận'};
                
                trans_confirm_info.payment_method = "atm"; //atm - credit
                // trans_confirm_info.status = { code: "confirm", name: 'chờ thanh toán' };
                
                $ionicLoading.show({
                    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Đang tải dữ liệu'
                });
                 apiService.create_transaction(JSON.stringify(trans_confirm_info))
                 .then(function(response) {
                        var result = response.data;
                        if (!result || result.error_code != "00") {
                            $scope.onloginerror = "Có lỗi trong quá trình xử lý. Vui lòng thử lại sau";
                            $ionicLoading.hide();
                            return;
                        }
                        // if (payment_option == "bigpay") {
                        //     $state.go('transaction.paybybigpay', {}, { reload: true });
                        // };
                        // if (payment_method == "atm" || payment_method == "credit") {
                           $scope.url = function(src){
                               $ionicLoading.hide();
                               return $sce.trustAsResourceUrl(src);                               
                           }
                           $scope.murl = {src:result.url_redirect};
                        // }
                        console.log($scope.url);
                    });



        $scope.invoices = contentService.GetinvoiceDetail($stateParams.customerid);
        console.log($scope.invoices);
        
         if ($stateParams.atm == 1) {
                 $scope.atm = false;
        }
        else {
             $scope.atm = true;
             $scope.pay_ok = true;
             $scope.data_is_ok2 = false;
             var search_data2 = {};
             $scope.searchContent2 = function(){
                 $scope.data_is_ok2 = true;
                //  search_data2.customerid = $stateParams.customerid;
                //  search_data2.amount = money;
                //  search_data2.note = "Thanh toan qua ATM";  
             }
             
            
             
             
            //  apiService.pay($stateParams.customerid, merchant, $stateParams.customerid, money, 'GNCE')
            //                 .then(function (response) {
            //                     var result = response.data;
            //                     $scope.pay_ok = result.error_code == "00";
            //                     var return_result = {};
            //                     return_result.error_message = result.error_message;
            //                     if ($scope.pay_ok) {
            //                         $scope.confirm = true;
            //                         $scope.trans_id = result.trans_id;
            //                         // $scope.error_message = result.error_message;
            //                         return_result.return_url = return_url + "&response_code=0"
            //                             + "&response_message=" + result.error_message
            //                             + "&transaction_no=" + result.trans_id
            //                             + "&payment_type=BIGPAY&secure_hash=";
            //                         // var search_data2 = {};
            //                         // search_data2.amount = searchdata.money;
            //                         // search_data2.note = "Thanh toan qua ATM";
            //                         // var contents = contentService.debt_tiles(search_data2)
            //                         // console.log(contents);
            //                     }
            //                     else {
            //                         console.log("aaa");
            //                         $scope.error_message = result.error_message;
            //                         return_result.return_url = return_url + "&response_code=3"
            //                             + "&response_message=" + result.error_message
            //                             + "&transaction_no=" + result.trans_id
            //                             + "&payment_type=BIGPAY&secure_hash=";   
            //                     }
            //                     console.log(return_result);
            //                 })
            $scope.clear_data = function () {
                $window.location.reload(true);
            }
        }

        $scope.searchContent = function (search_data) {
            var searchdata = {};
            searchdata.user = search_data.user;
            searchdata.pass = search_data.pass;
            searchdata.money = money;
            searchdata.otp = $stateParams.customerid;
            var hass_key = "198BE3F2E8C75A53F38C1C4A5B6DBA27";
            var access_code = "BIGPAYTEST";
            var locale = "VN";
            // var merchant = "TESTMERCHANT";
            // var return_url = "http://localhost:800/ntg/mobil_final/www/#/tab/payment";
            var order_info = "Thanh toán tiền điện"
            var versions = 1.0;

            console.log(searchdata);


            // var md5 = CryptoJS.MD5(hass_key + access_code + searchdata.money + locale + merchant + searchdata.otp + return_url + order_info + versions).toString();

            // $window.location.href = 'http://sandbox.bigpay.vn/#/?version=1.0&locale=VN&command=pay&merchant=TESTMERCHANT&access_code=BIGPAYTEST&merch_txn_ref=' + search_data.otp +'&currency=VND&amount='+ search_data.money +'&return_url=' + return_url + '&secure_hash=' + md5

            //    ionic.Platform.ready(function () {
            //     // var ref = window.open('http://sandbox.bigpay.vn/#/mobile/api?version=1.0&locale=VN&command=pay&merchant=TESTMERCHANT&access_code=BIGPAYTEST&merch_txn_ref=' + searchdata.otp +'&currency=VND&amount='+ searchdata.money + '&order_info='+ order_info +'&secure_hash=' + md5 + '&bigpayu=' + searchdata.user + '&bigpayp=' + searchdata.pass);
            //     var ref = window.open('http://sandbox.bigpay.vn/#/?version=1.0&locale=VN&command=pay&merchant=TESTMERCHANT&access_code=BIGPAYTEST&merch_txn_ref=' + searchdata.otp +'&currency=VND&amount='+ searchdata.money +'&return_url=' + return_url + '&secure_hash=' + md5);
            // });
            // console.log(md5);
            // try{
            if (searchdata.user != '' && searchdata.pass != '') {
                apiService.auth(searchdata.user, searchdata.pass).then(function (response) {
                    var auth_response = response.data;
                    $scope.data_is_ok = auth_response.error_code == "00";

                    if (!$scope.data_is_ok) {
                        $scope.error_message = "Thông tin tài khoản không hợp lệ. Vui lòng kiểm tra và thử lại !";
                    }
                    else {
                        $scope.pay_ok2 = true;
                        var search_data3 = {};
                        search_data3.customerid = $stateParams.customerid;
                        search_data3.amount = searchdata.money;
                        search_data3.note = "Thanh toan qua ATM";
                        var contents = contentService.debt_tiles(search_data3)
                        console.log(contents);
                        
                        // apiService.pay(searchdata.user, merchant, searchdata.otp, searchdata.money, 'GNCE')
                        //     .then(function (response) {
                        //         var result = response.data;
                        //         $scope.pay_ok = result.error_code == "00";
                        //         var return_result = {};
                        //         return_result.error_message = result.error_message;
                        //         if ($scope.pay_ok) {
                        //             $scope.confirm = true;
                        //             $scope.trans_id = result.trans_id;
                        //             // $scope.error_message = result.error_message;
                        //             return_result.return_url = return_url + "&response_code=0"
                        //                 + "&response_message=" + result.error_message
                        //                 + "&transaction_no=" + result.trans_id
                        //                 + "&payment_type=BIGPAY&secure_hash=";
                        //             // var search_data2 = {};
                        //             // search_data2.amount = searchdata.money;
                        //             // search_data2.note = "Thanh toan qua ATM";
                        //             // var contents = contentService.debt_tiles(search_data2)
                        //             // console.log(contents);
                        //         }
                        //         else {
                        //             $scope.error_message = result.error_message;
                        //             return_result.return_url = return_url + "&response_code=3"
                        //                 + "&response_message=" + result.error_message
                        //                 + "&transaction_no=" + result.trans_id
                        //                 + "&payment_type=BIGPAY&secure_hash=";
                        //         }
                        //         console.log(return_result);
                        //     })
                    }
                });

            }
            else {
                $scope.error_message = "Thông tin tài khoản không hợp lệ. Vui lòng kiểm tra và thử lại !";
            }

            $scope.clear_data = function () {
                $window.location.reload(true);
            }
        };
    })
    .controller('SupportCtrl', function ($scope, $location, contentService) {
        $scope.isLogin = false;
        console.log($scope.isLogin);
        $scope.title = {
            title: 'Hỗ trợ Khách hàng',
            icon: 'ios-help'
        };

        $scope.catalogs = [
            { title: 'Thông báo sự cố', id: 1, icon: 'help-buoy', href: '#/app/unservice' },
            { title: 'Gửi yêu cầu hỗ trợ', id: 2, icon: 'ios-email', href: '#/app/unservice' },
            { title: 'Đánh giá dịch vụ', id: 3, icon: 'ios-star', href: '#/app/unservice' },
            { title: 'Tổng đài CSKH', id: 3, icon: 'android-call', href: '#tel:19001288' },
            { title: 'Các yêu cầu của tôi', id: 3, icon: 'ios-list', href: '#/app/unservice' }
        ];
    })

    .controller('ServiceCtrl', function ($scope, $location, contentService, $ionicModal) {
        $scope.isLogin = false;
        console.log($scope.isLogin);
        $scope.title = {
            title: 'Dịch vụ',
            icon: 'ios-cloud'
        };

        $scope.catalogs = [
            { title: 'Thông tin hợp đồng', id: 1, icon: 'help-buoy', href: '#/app/unservice' },
            { title: 'Đăng ký dịch vụ', id: 2, icon: 'ios-email', href: '#/app/unservice' }
        ];
    })
    .controller('RatingCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.contents = contentService.Getrating();
        console.log($scope.contents);
    })
    .controller('RatingdetailCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.contents = contentService.Getratingdetail($stateParams.id);
        var result = $scope.contents;
        $scope.search_data = {};
        $scope.search_data.q = '';
        $scope.search_data.a = '';
        $scope.answers = [];
        window.setTimeout(function () {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                console.log(i);
                $scope.answers = result[i].answers;
                console.log($scope.answers);
                break;
            }
        }, 1000);
        var searchdata = [];
        $scope.searchContent = function (answers) {
            for (var i = 0; i < result.length; i++) {
                searchdata.push({ questionId: result[i].id, answerId: answers[i].Id })
            }
            console.log(searchdata);
            var quiz = JSON.stringify(searchdata);
            console.log(quiz)
            $scope.putrating = contentService.Putrating(quiz);
            console.log($scope.putrating);
        }
    })
    .controller('LoginCtrl', function ($scope, $state, $localstorage, apiService) {
        $scope.isLogin = true;
        console.log($scope.isLogin);
        $scope.user = null;
    })

    .controller('AccountCtrl', function ($scope, $localstorage, $state, $cordovaAppVersion) {
        $scope.user_info = $localstorage.getObject('user');
    })

    .controller('EbankOutSideCtrl', function ($scope, $localstorage, $state, $ionicModal, contentService) {
        $scope.ebanklist = [
            { value: 'Chọn ngân hàng' },
            { value: 'Ngân hàng Ngoại Thương Việt Nam - Vietcombank', id: '970436' },
            { value: 'Ngân hàng Kỹ thương Việt Nam - Techcombank', id: '970407' },
            { value: 'Ngân hàng Quân đội - MBBank', id: '970422' },
            { value: 'Ngân hàng Quốc tế - VIB', id: '970441' },
            { value: 'Ngân hàng Công thương - ViettinBank', id: '970489' },
            { value: 'Ngân hàng Hàng hải - Maritimebank', id: '970441' },
            { value: 'Ngân hàng Việt Nam Thịnh vượng - VPBank', id: '970432' },
            { value: 'Ngân hàng Nam Á - NamAbank', id: '970428' },
            { value: 'Ngân hàng Sài Gon - Saigonbank', id: '161087' },
            { value: 'Ngân hàng Xăng dầu Petrolimex - PGBank', id: '970430' },
            { value: 'Ngân hàng Phát triển Nông thôn - Agribank', id: '970499' },
            { value: 'Ngân hàng Việt Á - VietAbank', id: '970427' },
            { value: 'Ngân hàng Đại dương - Oceanbank', id: '970414' },
            { value: 'Ngân hàng An Bình - ABBank', id: '970459' },
            { value: 'Ngân hàng Tiên Phong - TPBank', id: '970423' },
            { value: 'Ngân hàng Đầu tư và phát triển Việt Nam - BIDV', id: '970488' },
            { value: 'Ngân hàng SHB - SHBank', id: '970443' },
            { value: 'Ngân hàng Đông Nam Á - Seabank', id: '970468' },
            { value: 'Ngân hàng Bắc Á - BACA', id: '970409' }
        ];
        $scope.info_user = [
            { value: 'Chọn Tài Khoản' },
            { value: '007-10010-056-530', id: '1' },
            { value: '000-3746-300-011', id: '2' }
        ];

        $scope.search_data = {};
        $scope.search_data.infou = $scope.info_user[0];
        $scope.search_data.infof = $scope.info_user[0];
        $scope.search_data.userf = '';
        $scope.search_data.bankName = $scope.ebanklist[0];
        $scope.search_data.amount = '';
        $scope.search_data.comment = '';

        $scope.searchContent = function (search_data) {
            var searchdata = {};
            searchdata.infou = search_data.infou.value;
            searchdata.infof = search_data.infof.value;
            searchdata.userf = search_data.userf;
            searchdata.bankName = search_data.bankName.value;
            searchdata.amount = search_data.amount;
            searchdata.comment = search_data.comment;
            console.log(searchdata);
        }
        $scope.clear = function () {
            $scope.search_data.infou = $scope.info_user[0];
            $scope.search_data.infof = $scope.info_user[0];
            $scope.search_data.userf = '';
            $scope.search_data.bankName = $scope.ebanklist[0];
            $scope.search_data.amount = '';
            $scope.search_data.comment = '';
        }

    })

    .controller('InfoDetailCtrl', function ($scope, $stateParams, $sce, contentService) {
        for (var i = 0; i < $scope.catalogs.length; i++) {
            if ($scope.catalogs[i].id == $stateParams.catalogId) {
                $scope.catalog = $scope.catalogs[i];
                break;
            }
        }
        // $scope.catalog = contentService.getCatalog($stateParams.catalogId);
        $scope.content = contentService.getContent($stateParams.catalogId, $stateParams.Id);
        //console.log($scope.catalog);
    })

    .controller('InfoListDetailCtrl', function ($scope, $stateParams, $sce, contentService) {
        for (var i = 0; i < $scope.catalogs.length; i++) {
            if ($scope.catalogs[i].id == $stateParams.catalogId) {
                $scope.catalog = $scope.catalogs[i];
                break;
            }
        }

        // console.log(search_data);
        var user_info = $localstorage.getObject('user');
        var notif_catalog_id = '566e017de77a499f271b0d25';
        var searchdata = {};
        searchdata.year = '';
        searchdata.month = '';
        searchdata.date = '';
        searchdata.period = '';
        searchdata.catalogId = $stateParams.catalogId;
        $scope.contents = contentService.getContent(notif_catalog_id, $stateParams.catalogId, user_info.user_name);
        console.log($scope.contents);
    })
    .controller('DetailCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        for (var i = 0; i < $scope.catalogs.length; i++) {
            if ($scope.catalogs[i].id == $stateParams.catalogId) {
                $scope.catalog = $scope.catalogs[i];
                break;
            }
        }

        // console.log(search_data);
        var searchdata = {};
        searchdata.year = '';
        searchdata.month = '';
        searchdata.date = '';
        searchdata.period = '';
        searchdata.catalogId = $stateParams.catalogId;
        $scope.contents = contentService.searchContent(searchdata);
        console.log($scope.contents);
    })

    .controller('GraphCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        for (var i = 0; i < $scope.catalogs.length; i++) {
            if ($scope.catalogs[i].id == $stateParams.catalogId) {
                $scope.catalog = $scope.catalogs[i];
                break;
            }
        }

        // $scope.graph = {};

        var search_data = {};
        $scope.searchChartContent = function (search_data) {
            //console.log(search_data);
            var searchdata = {};
            searchdata.year = search_data.year;
            searchdata.year2 = search_data.year2;
            searchdata.month = '';
            searchdata.date = '';
            searchdata.period = search_data.period;
            searchdata.catalogId = $stateParams.catalogId;
            $scope.series1 = ['Điện tiêu thụ ' + search_data.year, 'Điện tiêu thụ ' + search_data.year2];
            $scope.series2 = ['Tiền điện ' + search_data.year, 'Tiền điện ' + search_data.year2];
            $scope.title1 = "Thống kê điện tiêu thụ năm " + search_data.year + ' - ' + search_data.year2;
            $scope.title2 = "Thống kê tiền điện năm " + search_data.year + ' - ' + search_data.year2;

            //    var myDate = {};
            // searchdata = search_data; 
            console.log(searchdata);
            $scope.datagraph = contentService.GetChar(searchdata);
            console.log($scope.datagraph);
            //       $scope.graph = {};
            //   $scope.graph.data = [
            //     //Awake
            //     $scope.datagraph.san_luong
            //   ];
            //   $scope.graph.labels = $scope.datagraph.thang;
            //   $scope.graph.series = ['Điện năng (Kwh)',];
            //   console.log($scope.graph);
        };

    })
    .controller('EbankListBillCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.info_user = [
            { value: 'Chọn Tài Khoản' },
            { value: '007-10010-056-530', id: '1' },
            { value: '000-3746-300-011', id: '2' }
        ];

        $scope.services = [
            { value: 'Chọn Dịch Vụ' },
            { value: 'HÓA ĐƠN TIỀN ĐIỆN', id: '1' },
            { value: 'VÉ MÁY BAY ĐIỆN TỬ', id: '2' },
            { value: 'ĐIỆN THOẠI DI ĐỘNG/3G TRẢ SAU', id: '3' },
            { value: 'HÓA ĐƠN TIỀN NƯỚC', id: '4' },
            { value: 'ĐIỆN THOẠI CỐ ĐỊNH', id: '5' },
            { value: 'INTERNET', id: '6' },
            { value: 'TRUYỀN HÌNH CÁP', id: '7' },
            { value: 'VÉ TÀU ĐIỆN TỬ', id: '8' },
            { value: 'TÍN DỤNG', id: '9' },
            { value: 'BẢO HIỂM', id: '10' },
            { value: 'DỊCH VỤ KHÁC', id: '11' },
        ];

        $scope.suppliers = [
            { value: 'Chọn Nhà Cung Cấp' },
            { value: 'EVN', id: '1' },
            { value: 'VIETTEL', id: '2' },
            { value: 'FPT', id: '3' },
        ]
        $scope.tpos = false;
        $scope.search_data = {};
        $scope.search_data.infou = $scope.info_user[0];
        $scope.search_data.service = $scope.services[0];
        $scope.search_data.supplier = $scope.suppliers[0];
        $scope.search_data.bill = '';

        $scope.searchContent = function (search_data) {
            $scope.tpos = true;
            var searchdata = {};
            searchdata.infou = search_data.infou.value;
            searchdata.service = search_data.service.value;
            searchdata.supplier = search_data.supplier.value;
            searchdata.bill = search_data.bill;
            console.log(searchdata);
        }
    })
    .controller('EbankBillCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.info_user = [
            { value: 'Chọn Tài Khoản' },
            { value: '007-10010-056-530', id: '1' },
            { value: '000-3746-300-011', id: '2' }
        ];

        $scope.services = [
            { value: 'Chọn Dịch Vụ' },
            { value: 'HÓA ĐƠN TIỀN ĐIỆN', id: '1' },
            { value: 'VÉ MÁY BAY ĐIỆN TỬ', id: '2' },
            { value: 'ĐIỆN THOẠI DI ĐỘNG/3G TRẢ SAU', id: '3' },
            { value: 'HÓA ĐƠN TIỀN NƯỚC', id: '4' },
            { value: 'ĐIỆN THOẠI CỐ ĐỊNH', id: '5' },
            { value: 'INTERNET', id: '6' },
            { value: 'TRUYỀN HÌNH CÁP', id: '7' },
            { value: 'VÉ TÀU ĐIỆN TỬ', id: '8' },
            { value: 'TÍN DỤNG', id: '9' },
            { value: 'BẢO HIỂM', id: '10' },
            { value: 'DỊCH VỤ KHÁC', id: '11' },
        ];

        $scope.search_data = {};
        $scope.search_data.infou = $scope.info_user[0];
        $scope.search_data.service = $scope.services[0];
        $scope.search_data.amount = '';
        $scope.search_data.bill = '';

        $scope.searchContent = function (search_data) {
            var searchdata = {};
            searchdata.infou = search_data.infou.value;
            searchdata.service = search_data.service.value;
            searchdata.amount = search_data.amount;
            searchdata.bill = search_data.bill;
            console.log(searchdata);
        }
    })
    .controller('EpaymentCashinCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService){
        $scope.info_user = [
            { value: 'Chọn Tài Khoản' },
            { value: '007-10010-056-530', id: '1' },
            { value: '000-3746-300-011', id: '2' }
        ];

        $scope.search_data = {};
        $scope.search_data.infou = $scope.info_user[0];
        $scope.search_data.infof = $scope.info_user[0];
        $scope.search_data.amount = '';
        $scope.search_data.comment = '';

        $scope.searchContent = function (search_data) {
            var searchdata = {};
            searchdata.infou = search_data.infou.value;
            searchdata.infof = search_data.infof.value;
            searchdata.amount = search_data.amount;
            searchdata.comment = search_data.comment;
            console.log(searchdata);
        }
        $scope.clear = function () {
            $scope.search_data.infou = $scope.info_user[0];
            $scope.search_data.infof = $scope.info_user[0];
            $scope.search_data.amount = '';
            $scope.search_data.comment = '';
        }
    })
    .controller('EpaymentCashoutCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService){
        $scope.info_user = [
            { value: 'Chọn Tài Khoản' },
            { value: '007-10010-056-530', id: '1' },
            { value: '000-3746-300-011', id: '2' }
        ];

        $scope.search_data = {};
        $scope.search_data.infou = $scope.info_user[0];
        $scope.search_data.infof = $scope.info_user[0];
        $scope.search_data.amount = '';
        $scope.search_data.comment = '';

        $scope.searchContent = function (search_data) {
            var searchdata = {};
            searchdata.infou = search_data.infou.value;
            searchdata.infof = search_data.infof.value;
            searchdata.amount = search_data.amount;
            searchdata.comment = search_data.comment;
            console.log(searchdata);
        }
        $scope.clear = function () {
            $scope.search_data.infou = $scope.info_user[0];
            $scope.search_data.infof = $scope.info_user[0];
            $scope.search_data.amount = '';
            $scope.search_data.comment = '';
        }
    })
    .controller('EbankInsideCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.info_user = [
            { value: 'Chọn Tài Khoản' },
            { value: '007-10010-056-530', id: '1' },
            { value: '000-3746-300-011', id: '2' }
        ];

        $scope.search_data = {};
        $scope.search_data.infou = $scope.info_user[0];
        $scope.search_data.infof = $scope.info_user[0];
        $scope.search_data.amount = '';
        $scope.search_data.comment = '';

        $scope.searchContent = function (search_data) {
            var searchdata = {};
            searchdata.infou = search_data.infou.value;
            searchdata.infof = search_data.infof.value;
            searchdata.amount = search_data.amount;
            searchdata.comment = search_data.comment;
            console.log(searchdata);
        }
        $scope.clear = function () {
            $scope.search_data.infou = $scope.info_user[0];
            $scope.search_data.infof = $scope.info_user[0];
            $scope.search_data.amount = '';
            $scope.search_data.comment = '';
        }
    })
    .controller('TranshCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.info_user = [
            { value: 'Chọn Tài Khoản' },
            { value: '007-10010-056-530', id: '1' },
            { value: '000-3746-300-011', id: '2' }
        ];

        $scope.search_data = {};
        $scope.search_data.infou = $scope.info_user[0];
        $scope.search_data.fromday = '';
        $scope.search_data.today = '';

        $scope.searchContent = function (search_data) {
            var searchdata = {};
            searchdata.infou = search_data.infou.value;
            searchdata.fromday = search_data.fromday;
            searchdata.today = search_data.today;
            console.log(searchdata);
        }
    })
    .controller('EbankInfoCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.info_user = [
            { value: 'Chọn Tài Khoản' },
            { value: '007-10010-056-530', id: '1' },
            { value: '000-3746-300-011', id: '2' }
        ];
        $scope.transaction = [
            { value: 'Lựa chọn giao dịch' },
            { value: 'Nạp tiền', id: '1' },
            { value: 'Thanh toán hóa đơn ', id: '2' }
        ];

        $scope.search_data = {};
        $scope.search_data.infou = $scope.info_user[0];
        $scope.search_data.balance = '5,000,000';
        $scope.search_data.trans = $scope.transaction[0];

        $scope.searchContent = function (search_data) {
            var searchdata = {};
            searchdata.infou = search_data.infou.value;
            searchdata.balance = search_data.balance;
            searchdata.trans = search_data.trans.value;
            console.log(searchdata);
        }
    })
    .controller('EvisacreditCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.ebanklist = [
            { value: 'Chọn Ngân Hàng' },
            { value: 'Ngân hàng Ngoại Thương Việt Nam - Vietcombank', id: '970436' },
            { value: 'Ngân hàng Kỹ thương Việt Nam - Techcombank', id: '970407' },
            { value: 'Ngân hàng Quân đội - MBBank', id: '970422' },
            { value: 'Ngân hàng Quốc tế - VIB', id: '970441' },
            { value: 'Ngân hàng Công thương - ViettinBank', id: '970489' },
            { value: 'Ngân hàng Hàng hải - Maritimebank', id: '970441' },
            { value: 'Ngân hàng Việt Nam Thịnh vượng - VPBank', id: '970432' },
            { value: 'Ngân hàng Nam Á - NamAbank', id: '970428' },
            { value: 'Ngân hàng Sài Gon - Saigonbank', id: '161087' },
            { value: 'Ngân hàng Xăng dầu Petrolimex - PGBank', id: '970430' },
            { value: 'Ngân hàng Phát triển Nông thôn - Agribank', id: '970499' },
            { value: 'Ngân hàng Việt Á - VietAbank', id: '970427' },
            { value: 'Ngân hàng Đại dương - Oceanbank', id: '970414' },
            { value: 'Ngân hàng An Bình - ABBank', id: '970459' },
            { value: 'Ngân hàng Tiên Phong - TPBank', id: '970423' },
            { value: 'Ngân hàng Đầu tư và phát triển Việt Nam - BIDV', id: '970488' },
            { value: 'Ngân hàng SHB - SHBank', id: '970443' },
            { value: 'Ngân hàng Đông Nam Á - Seabank', id: '970468' },
            { value: 'Ngân hàng Bắc Á - BACA', id: '970409' }
        ];
        
        $scope.search_data = {};
        $scope.search_data.bankName = $scope.ebanklist[0];

    })
    .controller('EvisadebitCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.ebanklist = [
            { value: 'Chọn Ngân Hàng' },
            { value: 'Ngân hàng Ngoại Thương Việt Nam - Vietcombank', id: '970436' },
            { value: 'Ngân hàng Kỹ thương Việt Nam - Techcombank', id: '970407' },
            { value: 'Ngân hàng Quân đội - MBBank', id: '970422' },
            { value: 'Ngân hàng Quốc tế - VIB', id: '970441' },
            { value: 'Ngân hàng Công thương - ViettinBank', id: '970489' },
            { value: 'Ngân hàng Hàng hải - Maritimebank', id: '970441' },
            { value: 'Ngân hàng Việt Nam Thịnh vượng - VPBank', id: '970432' },
            { value: 'Ngân hàng Nam Á - NamAbank', id: '970428' },
            { value: 'Ngân hàng Sài Gon - Saigonbank', id: '161087' },
            { value: 'Ngân hàng Xăng dầu Petrolimex - PGBank', id: '970430' },
            { value: 'Ngân hàng Phát triển Nông thôn - Agribank', id: '970499' },
            { value: 'Ngân hàng Việt Á - VietAbank', id: '970427' },
            { value: 'Ngân hàng Đại dương - Oceanbank', id: '970414' },
            { value: 'Ngân hàng An Bình - ABBank', id: '970459' },
            { value: 'Ngân hàng Tiên Phong - TPBank', id: '970423' },
            { value: 'Ngân hàng Đầu tư và phát triển Việt Nam - BIDV', id: '970488' },
            { value: 'Ngân hàng SHB - SHBank', id: '970443' },
            { value: 'Ngân hàng Đông Nam Á - Seabank', id: '970468' },
            { value: 'Ngân hàng Bắc Á - BACA', id: '970409' }
        ];
        
        $scope.search_data = {};
        $scope.search_data.bankName = $scope.ebanklist[0];
    })
    .controller('CregisterCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.ebanklist = [
            { value: 'Chọn Ngân Hàng' },
            { value: 'Ngân hàng Ngoại Thương Việt Nam - Vietcombank', id: '970436' },
            { value: 'Ngân hàng Kỹ thương Việt Nam - Techcombank', id: '970407' },
            { value: 'Ngân hàng Quân đội - MBBank', id: '970422' },
            { value: 'Ngân hàng Quốc tế - VIB', id: '970441' },
            { value: 'Ngân hàng Công thương - ViettinBank', id: '970489' },
            { value: 'Ngân hàng Hàng hải - Maritimebank', id: '970441' },
            { value: 'Ngân hàng Việt Nam Thịnh vượng - VPBank', id: '970432' },
            { value: 'Ngân hàng Nam Á - NamAbank', id: '970428' },
            { value: 'Ngân hàng Sài Gon - Saigonbank', id: '161087' },
            { value: 'Ngân hàng Xăng dầu Petrolimex - PGBank', id: '970430' },
            { value: 'Ngân hàng Phát triển Nông thôn - Agribank', id: '970499' },
            { value: 'Ngân hàng Việt Á - VietAbank', id: '970427' },
            { value: 'Ngân hàng Đại dương - Oceanbank', id: '970414' },
            { value: 'Ngân hàng An Bình - ABBank', id: '970459' },
            { value: 'Ngân hàng Tiên Phong - TPBank', id: '970423' },
            { value: 'Ngân hàng Đầu tư và phát triển Việt Nam - BIDV', id: '970488' },
            { value: 'Ngân hàng SHB - SHBank', id: '970443' },
            { value: 'Ngân hàng Đông Nam Á - Seabank', id: '970468' },
            { value: 'Ngân hàng Bắc Á - BACA', id: '970409' }
        ];
        $scope.citys = [
            { value: 'Chọn tinh thành' },
            { value: 'An Giang', id: '1' },
            { value: 'Bà Rịa - Vũng Tàu', id: '2' },
            { value: 'Bạc Liêu', id: '3' },
            { value: 'Bắc Cạn', id: '4' },
            { value: 'Bắc Giang', id: '5' },
            { value: 'Bắc Ninh', id: '6' },
            { value: 'Bến Tre', id: '7' },
            { value: 'Bình Dương', id: '8' },
            { value: 'Bình Định', id: '9' },
            { value: 'Bình Phước', id: '10' },
            { value: 'Bình Thuận', id: '11' },
            { value: 'Cà Mau', id: '12' },
            { value: 'Cao Bằng', id: '13' },
            { value: 'Cần Thơ', id: '14' },
            { value: 'Đà Nẵng', id: '15' },
            { value: 'Đắk Lắk', id: '16' },
            { value: 'Đắk Nông', id: '17' },
            { value: 'Đồng Nai', id: '18' },
            { value: 'Đồng Tháp', id: '19' },
            { value: 'Điện Biên', id: '20' },

            { value: 'Gia Lai', id: '21' },
            { value: 'Hà Giang', id: '22' },
            { value: 'Hà Nam', id: '23' },
            { value: 'Hà Nội', id: '24' },
            { value: 'Hà Tĩnh', id: '25' },
            { value: 'Hải Dương', id: '26' },
            { value: 'Hải Phòng', id: '27' },
            { value: 'Hòa Bình', id: '28' },
            { value: 'Hậu Giang', id: '29' },
            { value: 'Hưng Yên', id: '30' },
            { value: 'TP. Hồ Chí Minh', id: '31' },
            { value: 'Khánh Hòa', id: '32' },
            { value: 'Kiên Giang', id: '33' },
            { value: 'Kon Tum', id: '34' },
            { value: 'Lai Châu', id: '35' },
            { value: 'Lào Cai', id: '36' },
            { value: 'Lạng Sơn', id: '37' },
            { value: 'Lâm Đồng', id: '38' },
            { value: 'Long An', id: '39' },
            { value: 'Nam Định', id: '40' },

            { value: 'Nghệ An', id: '41' },
            { value: 'Ninh Bình', id: '42' },
            { value: 'Ninh Thuận', id: '43' },
            { value: 'Phú Thọ', id: '44' },
            { value: 'Phú Yên', id: '45' },
            { value: 'Quảng Bình', id: '46' },
            { value: 'Quảng Nam', id: '47' },
            { value: 'Quảng Ngãi', id: '48' },
            { value: 'Quảng Ninh', id: '49' },
            { value: 'Quảng Trị', id: '50' },
            { value: 'Sóc Trăng', id: '51' },
            { value: 'Sơn La', id: '52' },
            { value: 'Tây Ninh', id: '53' },
            { value: 'Thái Bình', id: '54' },
            { value: 'Thái Nguyên', id: '55' },
            { value: 'Thanh Hóa', id: '56' },
            { value: 'Thừa Thiên - Huế', id: '57' },
            { value: 'Tiền Giang', id: '58' },
            { value: 'Trà Vinh', id: '59' },
            { value: 'Tuyên Quang', id: '60' },

            { value: 'Vĩnh Long', id: '61' },
            { value: 'Vĩnh Phúc', id: '62' },
            { value: 'Yên Bái', id: '63' },
        ];

        $scope.search_data = {};
        $scope.search_data.full_name = '';
        $scope.search_data.idCard = '';
        $scope.search_data.idCard_Time = '';
        $scope.search_data.idCard_Province = $scope.citys[0];
        $scope.search_data.contact_Number = '';
        $scope.search_data.email_Address = '';
        $scope.search_data.provinceId = $scope.citys[0];
        $scope.search_data.districtId = '';
        $scope.search_data.address = '';
        $scope.search_data.bankAccount = '';
        $scope.search_data.bankName = $scope.ebanklist[0];
        $scope.search_data.type = '';

        $scope.searchContent = function (search_data) {
            var searchdata = {};
            searchdata.full_name = search_data.full_name;
            searchdata.idCard = search_data.idCard;
            searchdata.idCard_Time = search_data.idCard_Time;
            // searchdata.year = search_data.idCard_Time.split('/')[2];
            // searchdata.month = search_data.idCard_Time.split('/')[1];
            // searchdata.date = search_data.idCard_Time.split('/')[0];
            searchdata.idCard_Province = search_data.idCard_Province.id;
            searchdata.contact_Number = search_data.contact_Number;
            searchdata.email_Address = search_data.email_Address;
            searchdata.provinceId = search_data.provinceId.id;
            searchdata.districtId = search_data.districtId;
            searchdata.address = search_data.address;
            searchdata.bankAccount = search_data.bankAccount;
            searchdata.bankName = search_data.bankName.value;
            searchdata.type = search_data.type;

            $scope.contents = contentService.GetCregister(searchdata);
            console.log($scope.contents);
        }
    })
    .controller('EregisterCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.ebanklist = [
            { value: 'Chọn Ngân Hàng' },
            { value: 'Ngân hàng Ngoại Thương Việt Nam - Vietcombank', id: '970436' },
            { value: 'Ngân hàng Kỹ thương Việt Nam - Techcombank', id: '970407' },
            { value: 'Ngân hàng Quân đội - MBBank', id: '970422' },
            { value: 'Ngân hàng Quốc tế - VIB', id: '970441' },
            { value: 'Ngân hàng Công thương - ViettinBank', id: '970489' },
            { value: 'Ngân hàng Hàng hải - Maritimebank', id: '970441' },
            { value: 'Ngân hàng Việt Nam Thịnh vượng - VPBank', id: '970432' },
            { value: 'Ngân hàng Nam Á - NamAbank', id: '970428' },
            { value: 'Ngân hàng Sài Gon - Saigonbank', id: '161087' },
            { value: 'Ngân hàng Xăng dầu Petrolimex - PGBank', id: '970430' },
            { value: 'Ngân hàng Phát triển Nông thôn - Agribank', id: '970499' },
            { value: 'Ngân hàng Việt Á - VietAbank', id: '970427' },
            { value: 'Ngân hàng Đại dương - Oceanbank', id: '970414' },
            { value: 'Ngân hàng An Bình - ABBank', id: '970459' },
            { value: 'Ngân hàng Tiên Phong - TPBank', id: '970423' },
            { value: 'Ngân hàng Đầu tư và phát triển Việt Nam - BIDV', id: '970488' },
            { value: 'Ngân hàng SHB - SHBank', id: '970443' },
            { value: 'Ngân hàng Đông Nam Á - Seabank', id: '970468' },
            { value: 'Ngân hàng Bắc Á - BACA', id: '970409' }
        ];

        $scope.citys = [
            { value: 'Chọn tinh thành' },
            { value: 'An Giang', id: '1' },
            { value: 'Bà Rịa - Vũng Tàu', id: '2' },
            { value: 'Bạc Liêu', id: '3' },
            { value: 'Bắc Cạn', id: '4' },
            { value: 'Bắc Giang', id: '5' },
            { value: 'Bắc Ninh', id: '6' },
            { value: 'Bến Tre', id: '7' },
            { value: 'Bình Dương', id: '8' },
            { value: 'Bình Định', id: '9' },
            { value: 'Bình Phước', id: '10' },
            { value: 'Bình Thuận', id: '11' },
            { value: 'Cà Mau', id: '12' },
            { value: 'Cao Bằng', id: '13' },
            { value: 'Cần Thơ', id: '14' },
            { value: 'Đà Nẵng', id: '15' },
            { value: 'Đắk Lắk', id: '16' },
            { value: 'Đắk Nông', id: '17' },
            { value: 'Đồng Nai', id: '18' },
            { value: 'Đồng Tháp', id: '19' },
            { value: 'Điện Biên', id: '20' },

            { value: 'Gia Lai', id: '21' },
            { value: 'Hà Giang', id: '22' },
            { value: 'Hà Nam', id: '23' },
            { value: 'Hà Nội', id: '24' },
            { value: 'Hà Tĩnh', id: '25' },
            { value: 'Hải Dương', id: '26' },
            { value: 'Hải Phòng', id: '27' },
            { value: 'Hòa Bình', id: '28' },
            { value: 'Hậu Giang', id: '29' },
            { value: 'Hưng Yên', id: '30' },
            { value: 'TP. Hồ Chí Minh', id: '31' },
            { value: 'Khánh Hòa', id: '32' },
            { value: 'Kiên Giang', id: '33' },
            { value: 'Kon Tum', id: '34' },
            { value: 'Lai Châu', id: '35' },
            { value: 'Lào Cai', id: '36' },
            { value: 'Lạng Sơn', id: '37' },
            { value: 'Lâm Đồng', id: '38' },
            { value: 'Long An', id: '39' },
            { value: 'Nam Định', id: '40' },

            { value: 'Nghệ An', id: '41' },
            { value: 'Ninh Bình', id: '42' },
            { value: 'Ninh Thuận', id: '43' },
            { value: 'Phú Thọ', id: '44' },
            { value: 'Phú Yên', id: '45' },
            { value: 'Quảng Bình', id: '46' },
            { value: 'Quảng Nam', id: '47' },
            { value: 'Quảng Ngãi', id: '48' },
            { value: 'Quảng Ninh', id: '49' },
            { value: 'Quảng Trị', id: '50' },
            { value: 'Sóc Trăng', id: '51' },
            { value: 'Sơn La', id: '52' },
            { value: 'Tây Ninh', id: '53' },
            { value: 'Thái Bình', id: '54' },
            { value: 'Thái Nguyên', id: '55' },
            { value: 'Thanh Hóa', id: '56' },
            { value: 'Thừa Thiên - Huế', id: '57' },
            { value: 'Tiền Giang', id: '58' },
            { value: 'Trà Vinh', id: '59' },
            { value: 'Tuyên Quang', id: '60' },

            { value: 'Vĩnh Long', id: '61' },
            { value: 'Vĩnh Phúc', id: '62' },
            { value: 'Yên Bái', id: '63' },
        ];

        $scope.search_data = {};
        $scope.search_data.e_name = '';
        $scope.search_data.full_name = '';
        $scope.search_data.taxcode = '';
        $scope.search_data.mobile = '';
        $scope.search_data.email = '';
        $scope.search_data.provinceId = $scope.citys[0];
        $scope.search_data.districtId = '';
        $scope.search_data.address = '';
        $scope.search_data.regProvinceId = $scope.citys[0];
        $scope.search_data.regDistrictId = '';
        $scope.search_data.regAddress = '';
        $scope.search_data.bankAccount = '';
        $scope.search_data.bankName = $scope.ebanklist[0];
        $scope.search_data.type = '';

        $scope.searchContent = function (search_data) {
            var searchdata = {};
            searchdata.e_name = search_data.e_name;
            searchdata.full_name = search_data.full_name;
            searchdata.taxcode = search_data.taxcode;
            searchdata.mobile = search_data.mobile;
            searchdata.email = search_data.email;
            searchdata.provinceId = search_data.provinceId.id;
            searchdata.districtId = search_data.districtId;
            searchdata.address = search_data.address;
            searchdata.regProvinceId = search_data.regProvinceId.id;
            searchdata.regDistrictId = search_data.regDistrictId;
            searchdata.regAddress = search_data.regAddress;
            searchdata.bankAccount = search_data.bankAccount;
            searchdata.bankName = search_data.bankName.value;
            searchdata.type = search_data.type;

            $scope.contents = contentService.GetEregister(searchdata);
            console.log($scope.contents);
        }
    })
    .controller('HomeneedCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
    })
    .controller('GetccCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.contents = contentService.GetCC();
        console.log($scope.contents);
    })
    .controller('ContractCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        var search_data = {};
        search_data.pageIndex = 1;
        $scope.contents = contentService.GetContract(search_data);
    })
    .controller('EcalendarCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        //== get date ==//
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        // if(mm<10) {
        //     mm=mm
        // } 
        var stoday = dd + '/' + "0" + (mm - 1) + '/' + yyyy;

        $scope.timer = [
            { value: '1:00 sáng', id: '1 AM' },
            { value: '1:30 sáng', id: '1:30 AM' },
            { value: '2:00 sáng', id: '2 AM' },
            { value: '2:30 sáng', id: '2:30 AM' },
            { value: '3:00 sáng', id: '3 AM' },
            { value: '3:30 sáng', id: '3:30 AM' },
            { value: '4:00 sáng', id: '4 AM' },
            { value: '4:30 sáng', id: '4:30 AM' },
            { value: '5:00 sáng', id: '5 AM' },
            { value: '5:30 sáng', id: '5:30 AM' },
            { value: '6:00 sáng', id: '6 AM' },
            { value: '6:30 sáng', id: '6:30 AM' },
            { value: '7:00 sáng', id: '7 AM' },
            { value: '7:30 sáng', id: '7:30 AM' },
            { value: '8:00 sáng', id: '8 AM' },
            { value: '8:30 sáng', id: '8:30 AM' },
            { value: '9:00 sáng', id: '9 AM' },
            { value: '9:30 sáng', id: '9:30 AM' },
            { value: '10:00 sáng', id: '10 AM' },
            { value: '10:30 sáng', id: '10:30 AM' },
            { value: '11:00 sáng', id: '11 AM' },
            { value: '11:30 sáng', id: '11:30 AM' },
            { value: '12:00 sáng', id: '12 AM' },

            { value: '1:00 chiều', id: '1 PM' },
            { value: '1:30 chiều', id: '1:30 PM' },
            { value: '2:00 chiều', id: '2 PM' },
            { value: '2:30 chiều', id: '2:30 PM' },
            { value: '3:00 chiều', id: '3 PM' },
            { value: '3:30 chiều', id: '3:30 PM' },
            { value: '4:00 chiều', id: '4 PM' },
            { value: '4:30 chiều', id: '4:30 PM' },
            { value: '5:00 chiều', id: '5 PM' },
            { value: '5:30 chiều', id: '5:30 PM' },
            { value: '6:00 chiều', id: '6 PM' },
            { value: '6:30 chiều', id: '6:30 PM' },
            { value: '7:00 chiều', id: '7 PM' },
            { value: '7:30 chiều', id: '7:30 PM' },
            { value: '8:00 chiều', id: '8 PM' },
            { value: '8:30 chiều', id: '8:30 PM' },
            { value: '9:00 chiều', id: '9 PM' },
            { value: '9:30 chiều', id: '9:30 PM' },
            { value: '10:00 chiều', id: '10 PM' },
            { value: '10:30 chiều', id: '10:30 PM' },
            { value: '11:00 chiều', id: '11 PM' },
            { value: '11:30 chiều', id: '11:30 PM' },
            { value: '12:00 chiều', id: '12 PM' },
        ];

        $scope.search_data = {};
        $scope.search_data.day = stoday;
        $scope.search_data.am = $scope.timer[16];
        $scope.ecalendar = function ecalendar(search_data) {
            var am = search_data.am.id;
            console.log(am);
        }

    })
    .controller('CashiersCtrl', function ($scope, $localstorage, $ionicLoading, $location, $window, $stateParams, contentService) {
        ionic.Platform.ready(function () {
            //    alert("vui lòng bật gps để thực hiện tìm kiếm");

            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Đang tải dữ liệu'
            });

            $scope.tpos = false;
            $scope.search_data = {};
            $scope.search_data.lat = '';
            $scope.search_data.long = '';
            var options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 0 };
            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
            // onSuccess Geolocation
            //
            function onSuccess(position) {
                // $scope.latitude = position.coords.latitude;
                // $scope.longitude = position.coords.longitude;
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                $scope.search_data.lat = lat;
                $scope.search_data.long = long;
                console.log(position)
                var myLatlng = new google.maps.LatLng(lat, long);
                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                // marker will be displayed on the lat long position
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map
                });
                //hiển thị popup vị trí
                var contentString = '<div style="color:#000;">hey đây là vị trí hiện tại của bạn</div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    pixelOffset: new google.maps.Size(0, 15)
                });
                infowindow.open(map, marker);
                //end

                $scope.map = map;
                $ionicLoading.hide();


            }
            // onError Callback receives a PositionError object
            //
            function onError(error) {
                $scope.error_message = "Bật GPS để sử dụng dịch vụ";
            }
            $scope.position = function position() {
                console.log("ok");
                $scope.tpos = true;
                $scope.contents = contentService.GetCashier($scope.search_data);
                console.log($scope.contents);
            }

            $scope.Cashiers = function cashier(id) {
                $ionicLoading.show({
                    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Đang tải dữ liệu'
                });
                var result = $scope.contents;
                for (var i = 0; i < result.length; i++) {
                    if (id == result[i].cashiercode) {
                        var lat = result[i].latitude;
                        var long = result[i].longtitude;
                        var fullname = result[i].fullname;
                        var contactnumber = result[i].contactnumber;
                        var lastupdatetime = result[i].lastupdatetime;
                    }
                }
                console.log(result)
                var myLatlng = new google.maps.LatLng(lat, long);
                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                // marker will be displayed on the lat long position
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map
                });
                //hiển thị popup vị trí
                var contentString = '<div style="color:#000;">' + fullname + '<br/>Số điện thoại : ' + contactnumber + '<br/>Thời gian cập nhật : ' + lastupdatetime + '</div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    pixelOffset: new google.maps.Size(0, 15)
                });
                infowindow.open(map, marker);
                //end

                $scope.map = map;
                $ionicLoading.hide();
            }
        }, false);
    })
    .controller('NewsCtrl', function ($scope, $localstorage, $ionicLoading, $location, $window, $stateParams, contentService) {
        $scope.intro = contentService.Getintro();
        $scope.newscategories = contentService.GetNewscategories();
        $scope.faq = contentService.Getfaq();
        console.log($scope.faq);
    })
    .controller('NewdetailsCtrl', function ($scope, $localstorage, $ionicLoading, $location, $window, $stateParams, contentService) {
        var search_data = {};
        search_data.id = $stateParams.id;
        search_data.page_index = 1;
        $scope.contents = contentService.GetNews(search_data);
        console.log($scope.contents);
    })
    .controller('NewdetailCtrl', function ($scope, $localstorage, $ionicLoading, $location, $window, $stateParams, contentService) {
        var id = $stateParams.id;
        $scope.contents = contentService.GetNewdetail(id);
        console.log($scope.contents);
    })
    .controller('InfoListCtrl', function ($scope, $localstorage, $location, $window, $stateParams, contentService) {
        $scope.dat = false;
        $scope.yea = false;
        $scope.per = false;
        $scope.mon = false;
        $scope.ty = false;
        $scope.per2 = false;
        //== get date ==//
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }

        // if(mm<10) {
        //     mm=mm
        // } 
        var stoday = "0" + 1 + '/' + "0" + (mm - 1) + '/' + yyyy;
        var stoday2 = "0" + 1 + '/' + "0" + mm + '/' + yyyy;
        //== get month ==//
        var tomonth = new Date();
        var mm2 = tomonth.getMonth() + 1; //January is 0!
        var yyyy2 = tomonth.getFullYear();
        if (mm < 10) {
            mm2 = '0' + mm;
            mm3 = '0' + (mm2 - 1);
        }
        var stomonth = mm3 + '/' + yyyy2;
        var stomonth2 = mm2 + '/' + yyyy2;
        console.log(stomonth2)
        $scope.search_data = {};
        $scope.search_data.date = stoday;//.toLocaleString().substring(0,today.toLocaleString().indexOf(' ')).replace(',','');
        $scope.search_data.date2 = stoday2;
        $scope.search_data.month = stomonth;
        $scope.search_data.month2 = stomonth2;
        $scope.search_data.month3 = stomonth;
        $scope.search_data.month4 = stomonth2;
        $scope.search_data.year = '' + yyyy;
        $scope.search_data.period = 1;
        for (var i = 0; i < $scope.catalogs.length; i++) {
            if ($scope.catalogs[i].id == $stateParams.catalogId) {
                $scope.catalog = $scope.catalogs[i];
                break;
            }
        }
        $scope.query_date = $stateParams.queryType === "date";
        $scope.query_year = $stateParams.queryType === "year";
        $scope.query_month = $stateParams.queryType === "month";
        // $scope.query_month = $stateParams.queryType === "month" || $stateParams.queryType === "period";
        $scope.query_period = $stateParams.queryType === "period";
        $scope.query_type = $stateParams.queryType === "type";
        $scope.searchContent = function (search_data) {
            //console.log(search_data);
            var searchdata = {};
            searchdata.year = '';
            searchdata.month = '';
            searchdata.date = '';
            searchdata.year2 = '';
            searchdata.month2 = '';
            searchdata.date2 = '';
            searchdata.period = '';
            searchdata.type = '';
            searchdata.catalogId = $stateParams.catalogId;
            //    var myDate = {};
            // searchdata = search_data;
            if ($scope.query_type) {
                $scope.ty = true;
                searchdata.type = search_data.type;
                $scope.contents = contentService.Getprice(searchdata);
                console.log($scope.contents);
            }
            if ($scope.query_date) {
                $scope.dat = true;
                console.log(search_data.date);
                console.log(search_data.date2);

                searchdata.year = search_data.date.split('/')[2];
                searchdata.month = search_data.date.split('/')[1];
                searchdata.date = search_data.date.split('/')[0];

                searchdata.year2 = search_data.date2.split('/')[2];
                searchdata.month2 = search_data.date2.split('/')[1];
                searchdata.date2 = search_data.date2.split('/')[0];

                $scope.contents = contentService.Getpower(searchdata);
                console.log($scope.contents);
            }
            if ($scope.query_year) {
                $scope.yea = true;
                searchdata.year = search_data.year;
                searchdata.year2 = search_data.year2;
                // $scope.contents = contentService.Getpower(searchdata);
                // console.log($scope.contents);
            }
            if ($scope.query_month) {
                $scope.mon = true;
                searchdata.year = search_data.month.split('/')[1];
                searchdata.month = search_data.month.split('/')[0];
                searchdata.date = 01;

                searchdata.year2 = search_data.month2.split('/')[1];
                searchdata.month2 = search_data.month2.split('/')[0];
                searchdata.date2 = 01;

                $scope.contents = contentService.Getmeterrecord(searchdata);
                console.log($scope.contents);
            }
            if (searchdata.catalogId == "565292d525062bee7f3e5d60") {
                console.log("otennnnn");
                $scope.per = true;
                searchdata.year = search_data.month3.split('/')[1];
                searchdata.month = search_data.month3.split('/')[0];
                searchdata.date = 01;

                searchdata.year2 = search_data.month4.split('/')[1];
                searchdata.month2 = search_data.month4.split('/')[0];
                searchdata.date2 = 01;
                searchdata.period = search_data.period;

                $scope.contents = contentService.Getmeter(searchdata);
                console.log($scope.contents);
            }
            if (searchdata.catalogId == "5652929e25062bee7f3e5d5e") {
                $scope.per2 = true;
                console.log("ote");
                searchdata.year = search_data.month3.split('/')[1];
                searchdata.month = search_data.month3.split('/')[0];
                searchdata.date = 01;

                searchdata.year2 = search_data.month4.split('/')[1];
                searchdata.month2 = search_data.month4.split('/')[0];
                searchdata.date2 = 01;
                searchdata.period = search_data.period;

                $scope.contents = contentService.Getinvoice(searchdata);
                console.log($scope.contents);
            }
            console.log(searchdata);
            // $scope.contents = contentService.searchContent(searchdata);
            // console.log($scope.contents);
        };

        //console.log($scope.search_data);
    });

