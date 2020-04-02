import {authReq, req, query, submit} from "../util/api";

//登录
export const login = (params) => {return authReq('post','/login',params)};
 //注册
export const register = (params) => {return authReq('post','/api/register',params)};

//用户管理========获取用户的菜单
export const menu = (params) => {return req('post','/api/leftMenu',params)};
//获取用户信息(用户管理界面)
export const queryUserData = (params) =>{return req('post','/api/userManage',params)}
//角色管理========获取所有的角色
export  const  queryAllRole = (params)  => {return req('get','api/role/selectAllRole',params)}
//获取所有的的菜单
export const  queryAllResource = (params) => {return req('get','/api/role/selectAllResource', params)}
//查询该角色拥有的权限（用于权限 设置的默认页面）
export  const  selectedMenu = (params) => {return query('get','/api/role/selectedMenu',params)}
//角色赋值权限以后，提交到后端
export  const  addRoleAuth = (params) => {return submit('post','/api/role/addRoleOfAuth',params)}