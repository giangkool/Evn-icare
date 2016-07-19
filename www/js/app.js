// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller:'HomeCtrl'
        }
      }
    })
    
    .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/account.html',
          controller:'AccountCtrl'
        }
      }
    })
    
    .state('app.myaccount', {
      url: '/my-account',
      views: {
        'menuContent': {
          templateUrl: 'templates/myaccount.html',
          // controller:'AccountCtrl'
        }
      }
    })
    
    .state('app.info',{
      url:'/info',
      views:{
        'menuContent':{
          templateUrl:'templates/info.html',
          controller:'InfoCtrl'
        }
      }
    })
    
    .state('app.payment',{
      url:'/payment',
      views:{
        'menuContent':{
          templateUrl:'templates/payment.html',
          controller:'PaymentCtrl'
        }
      }
    })
    
    .state('app.epayment',{
      url:'/epayment',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/epayment.html',
        }
      }
    })
    
    .state('app.epaymentcashin',{
      url:'/epayment-cashin',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/epayment_cashin.html',
          controller:'EpaymentCashinCtrl'
        }
      }
    })
    
    .state('app.epaymentcashout',{
      url:'/epayment-cashout',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/epayment_cashout.html',
          controller:'EpaymentCashoutCtrl'
        }
      }
    })
    
    .state('app.epaymentprepay',{
      url:'/epayment-prepay',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/epayment_prepay.html',
        }
      }
    })
    
    .state('app.epaymentsale',{
      url:'/epayment-sale',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/epayment_sale.html',
        }
      }
    })
    
    .state('app.epaymentcard',{
      url:'/epayment-easycard',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/epayment_card.html',
        }
      }
    })
    
    .state('app.epaymentpay',{
      url:'/epayment-tappay',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/epayment_pay.html',
          controller:'EpaymentpayCtrl'
        }
      }
    })

    .state('app.epaymentpaydetail',{
      url:'/epayment-tappay-detail',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/epayment_paydetail.html',
          controller:'Epaymentpay2Ctrl'
        }
      }
    })
    
    .state('app.epaymentpaytab',{
      url:'/epayment-tappaytab/:customerid/:amount/:atm',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/epayment_pay_tab.html',
          controller:'EpaymentpaytabCtrl'
        }
      }
    })
    
    .state('app.ebank',{
      url:'/ebank',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/ebank.html',
        }
      }
    })
    
    .state('app.infoebank',{
      url:'/ebank-info',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/ebank_info.html',
          controller:'EbankInfoCtrl'
        }
      }
    })
    
    .state('app.ebankbill',{
      url:'/ebank-bill',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/ebank_bill.html',
          controller:'EbankBillCtrl'
        }
      }
    })
    
    .state('app.ebanklistbill',{
      url:'/ebank-listbill',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/ebank_listbill.html',
          controller:'EbankListBillCtrl'
        }
      }
    })
    
     .state('app.transhebank',{
      url:'/ebank-transh',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/ebank_transh.html',
          controller:'TranshCtrl'
        }
      }
    })
    
    .state('app.ebankinside',{
      url:'/ebank-inside',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/ebank_inside.html',
          controller:'EbankInsideCtrl'
        }
      }
    })
    
    .state('app.ebankoutside',{
      url:'/ebank-outside',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/ebank_outside.html',
          controller:'EbankOutSideCtrl'
        }
      }
    })
    
    .state('app.need',{
      url:'/ehome-need',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/ehome.html',
          controller:'HomeneedCtrl'
        }
      }
    })
    
    .state('app.ecalendar',{
      url:'/ecalendar',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/ecalendar.html',
          controller:'EcalendarCtrl'
        }
      }
    })
    
    .state('app.evisa',{
      url:'/evisa',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/evisa.html',
        }
      }
    })
    
    .state('app.evisadebit',{
      url:'/evisa-debit',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/evisa_debit.html',
          controller: 'EvisadebitCtrl'
        }
      }
    })
    
    .state('app.evisacredit',{
      url:'/evisa-credit',
      views:{
        'menuContent':{
          templateUrl:'templates/payment/evisa_credit.html',
          controller: 'EvisacreditCtrl'
        }
      }
    })
    
    .state('app.done',{
      url:'/done',
      views:{
        'menuContent':{
          templateUrl:'templates/done.html',
        }
      }
    })
    
    .state('app.support',{
      url:'/support',
      views:{
        'menuContent':{
          templateUrl:'templates/support.html',
          controller:'SupportCtrl'
        }
      }
    })
    .state('app.service',{
      url:'/service',
      views:{
        'menuContent':{
          templateUrl:'templates/service.html',
          controller:'ServiceCtrl'
        }
      }
    })
    .state('app.rating',{
      url:'/rating',
      views:{
        'menuContent':{
          templateUrl:'templates/support/rating.html',
          controller:'RatingCtrl'
        }
      }
    })
    .state('app.ratingdetail',{
      url:'/ratingdetail/:id',
      views:{
        'menuContent':{
          templateUrl:'templates/support/ratingdetail.html',
          controller:'RatingdetailCtrl'
        }
      }
    })
    .state('app.rall',{
      url:'/rall',
      views:{
        'menuContent':{
          templateUrl:'templates/service/rall.html'
        }
      }
    })
    
     .state('app.cregisters',{
    url:'/cregister',
    views:{
      'menuContent':{
        templateUrl:'templates/service/cregister.html',
        controller:'CregisterCtrl'
      }
    }
  })
   .state('app.eregisters',{
    url:'/eregister',
    views:{
      'menuContent':{
        templateUrl:'templates/service/eregister.html',
        controller:'EregisterCtrl'
      }
    }
  })
   .state('app.contract',{
    url:'/contract',
    views:{
      'menuContent':{
        templateUrl:'templates/service/contract.html',
        controller:'ContractCtrl'
      }
    }
  })
  .state('app.news',{
      url:'/news',
      views:{
        'menuContent':{
          templateUrl:'templates/news.html',
          controller:'NewsCtrl'
        }
      }
    })
    .state('app.newdetails',{
      url:'/newdetails/:id',
      views:{
        'menuContent':{
          templateUrl:'templates/news/newdetails.html',
          controller:'NewdetailsCtrl'
        }
      }
    })
    .state('app.newdetail',{
      url:'/newdetail/:id',
      views:{
        'menuContent':{
          templateUrl:'templates/news/newdetail.html',
          controller:'NewdetailCtrl'
        }
      }
    })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
   .state('app.infodetail', {
    url: '/infodetail/:catalogId/:Id',
    views: {
      'menuContent': {
        templateUrl: 'templates/infodetail.html',
        controller: 'InfoDetailCtrl'
      }
    }
  })
  
  .state('app.unservice',{
    url:'/unservice',
    views:{
      'menuContent':{
        templateUrl:'templates/messagebox.html'
      }
    }
  })

 .state('app.cashiers',{
    url:'/cashiers',
    views:{
      'menuContent':{
        templateUrl:'templates/service/cashiers.html',
        controller:'CashiersCtrl'
      }
    }
  })  
  
  .state('app.getcc',{
    url:'/getcc',
    views:{
      'menuContent':{
        templateUrl:'templates/support/getCC.html',
        controller:'GetccCtrl'
      }
    }
  })  
  
  .state('app.chart',{
    url:'/chart/:catalogId',
    views:{
      'menuContent':{
        templateUrl:'templates/chart.html',
        controller:'GraphCtrl'
      }
    }
  })  
  
  .state('app.detail',{
    url:'/detail/:catalogId',
    views:{
      'menuContent':{
        templateUrl:'templates/detail.html',
        controller:'DetailCtrl'
      }
    }
  })  
  
  .state('app.infolist', {
    url: '/infolist/:catalogId/:queryType',
    views: {
      'menuContent': {
        templateUrl: 'templates/infolist.html',
        controller:'InfoListCtrl'
      }
    }
  })
  
   .state('app.infolistdetail', {
    url: '/infolistdetail',
    views: {
      'menuContent': {
        templateUrl: 'templates/infolistdetail.html',
        controller:'InfoListDetailCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
