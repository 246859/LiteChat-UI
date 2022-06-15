import {service} from "@/service/baseService";
import {globalConfig} from "@/config/config";

export const logoutService = () => {
    return service.delete(
        globalConfig.request.serve_url.auth.logout
    )
};

export const getFriendListService = (userName) => {
    return service.get(
        '/chat/getFriends',
        {
            params: {
                userName: userName
            }
        }
    )
};

export const getGroupListService = (userName) => {
    return service.get(
        '/chat/getGroups',
        {
            params: {
                userName: userName
            }
        }
    )
};

export const getFriendService = (userName, friendName) => {
    return service.get(
        '/chat/getFriend',
        {
            params: {
                userName: userName,
                friendName: friendName
            }
        }
    )
};

export const getGroupService = (groupId) => {
    return service.get(
        '/chat/getGroup',
        {
            params: {
                groupId: groupId
            }
        }
    )
};

export const addFriendService = (userName, friendUserName) => {
    return service.post(
        '/chat/addFriend',
        {},
        {
            params: {
                userName,
                friendUserName
            }
        }
    )
};


export const addGroupService = (userName, groupId) => {
    return service.post(
        '/chat/addGroup',
        {},
        {
            params: {
                userName: userName,
                groupId: groupId
            }
        }
    )
};

export const createGroupService = (userName, groupName) => {
    return service.post(
        '/chat/createGroup',
        {},
        {
            params: {
                userName: userName,
                groupName: groupName
            }
        }
    )
}

export const deleteFriendService = (userName, friendUserName) => {
    return service.delete(
        '/chat/deleteFriend',
        {
            params: {
                userName: userName,
                friendUserName: friendUserName
            }
        }
    )
};


export const deleteGroupService = (userName, groupId) => {
    return service.delete(
        '/chat/deleteGroup',
        {
            params: {
                userName: userName,
                groupId: groupId
            }
        }
    )
};

export const getGroupMembersService = (groupId) => {
    return service.get(
        '/chat/getGroupMembers',
        {
            params: {
                groupId: groupId
            }
        }
    )
};


export const getUserInfoService = (userName) => {
    return service.get(
        '/chat/getUserInfo',
        {
            params: {
                userName: userName
            }
        }
    )
};


