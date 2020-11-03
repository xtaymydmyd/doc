/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var bridge = {

    type:{
        TAKEPHOTO:"takephoto",
        TAKELOCATION:"takelocation",
        TAKEWATERMARK:"takewatermark",
        SELECTPHOTO: 'selectphoto',
        RUNSQL: 'runsql',
        GETDATABYSQL: 'getdatabysql',
        // TAKEPHOTO:"takephoto",
    },

    /**
     传入参数 size
     var dd = {"size":200};
     */
    takePhoto: function (d, successBack, errBack) {
        var dd = {};
        dd.type =bridge.type.TAKEPHOTO;
        dd.data = d;
        cordova.plugins.Test.coolMethod(dd, successBack, errBack);

    },
    pickPhoto: function (d, successBack, errBack) {
        var dd = {};
        dd.type =bridge.type.SELECTPHOTO;
        dd.data = d;
        cordova.plugins.Test.coolMethod(dd, successBack, errBack);

    },
    gps: function (successBack, errBack) {
        var dd = {};
        dd.type = bridge.type.TAKELOCATION;
        dd.data = {};
        cordova.plugins.Test.coolMethod(dd, successBack, errBack);
    },


    watermark: function (d, successBack, errBack) {
        d.shuiyins = d.watermarks;

        var dd = {};
        dd.type = bridge.type.TAKEWATERMARK;
        dd.data = d;

        cordova.plugins.Test.coolMethod(dd, successBack, errBack);
    },

    runSql: function (sql, successBack, errBack) {
        var sqls = new Array;
        sqls.push(sql);
        var dd = {};
        dd.type =bridge.type.RUNSQL;
        dd.data = sqls;
        cordova.plugins.Test.coolMethod(dd, successBack, errBack);
    },

    runSqls: function (sqls, successBack, errBack) {
        var dd = {};
        dd.type =bridge.type.RUNSQL;
        dd.data = sqls;
        cordova.plugins.Test.coolMethod(dd, successBack, errBack);
    },

    querySql: function (sql, successBack, errBack) {
        var data = {'sql': sql};
        var dd = {};
        dd.type =bridge.type.GETDATABYSQL;
        dd.data = data;
        cordova.plugins.Test.coolMethod(dd, successBack, errBack);

    },

    deviceInfo: function (d, successBack, errBack) {
        var dd = {};
        dd.type = "deviceInfo";
        dd.data = d;
        cordova.plugins.Test.coolMethod(dd, successBack, errBack);

    },
};

