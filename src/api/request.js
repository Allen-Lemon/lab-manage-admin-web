import {authReq, req, query, submit} from "../util/api";

//登录
export const login = (params) => {return authReq('post','/login',params)};
 //注册
export const register = (params) => {return authReq('post','/api/register',params)};

//用户管理========获取用户的菜单
export const menu = (params) => {return req('post','/api/user/leftMenu',params)};
//获取用户信息(用户管理界面)
export const queryUserData = (params) =>{return req('post','/api/user/userManage',params)}
//用户修改的页面上的角色管理
export const querySysAllRole = (params) =>{return query('get','/api/user/selectDialogRole',params)}
//查询当前用户有那些角色的id
export  const queryUserHavaRole = (params) => {return query('get','/api/user/selectUserHaveRoleByUserId',params)}
//角色管理========获取所有的角色
export  const  queryAllRole = (params)  => {return query('get','api/role/selectAllRole',params)}
//获取所有的的菜单
export const  queryAllResource = (params) => {return req('get','/api/role/selectAllResource', params)}
//查询该角色拥有的权限（用于权限 设置的默认页面）
export  const  selectedMenu = (params) => {return query('get','/api/role/selectedMenu',params)}
//角色赋值权限以后，提交到后端
export  const  addRoleAuth = (params) => {return submit('post','/api/role/addRoleOfAuth',params)}
//实验室管理======实验室房间管理-查找实验室房间
export  const  selectLaboratoryRoom = (params) =>{return query('get','/api/labsRoom/index',params)}
//查询所有的实验室的实验类型
export  const  selectLabType = (params) => {return query('get','/api/labsRoom/selectAllLabsType',params)}
//编辑或者添加实验室数据的提交
export  const  saveLaboratoryData = (params) =>  {return submit('post','/api/labsRoom/saveLaboratoryRoom',params)}
//编辑或者添加实验室的类型
export  const  saveLaboratoryType = (params) => {return   submit('post','/api/labsRoom/saveLabsType',params)}
//查询实验仪器
export  const  selectAllInstruct = (params) => {return query('get','/api/labsRoom/selectAllInstruct',params)}
//订单管理====预约订单-查询所有订单
export  const  selectAllOrder = (params) => {return query('get','/api/order/selectAllOrder',params)}
//查询订单的详细信息
export const  selectOrderDetails =(params) => {return query('get','/api/order/selectOrderDetails',params)}
//根据订单号查询订单使用的仪器
export const  selectInstructByOrderNo = (params) => {return query('get','/api/order/selectInstruct',params)}
//通过审核，修改订单的状态
export const  saveApproveOrder = (params) => {return submit('post','/api/order/saveApproveOrder',params)}