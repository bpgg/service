'use strict';

module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();

  router.get('/admin/index', controller.admin.main.index);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.post('/admin/updateArticle', controller.admin.main.updateArticle);
};
