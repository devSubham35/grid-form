export const baseApiUrl = `${process.env.NEXT_APP_BASE_URL}`;

export const endpoints = {
    auth: {
        login: "/auth/login",
        logout: "/auth/logout",
        signup: "/auth/register",
        refreshToken: "/auth/refresh-token"
    },
    media: {
        asset: "/asset",
    },
    user: {
        userList: "/user",        
        updateUser: (id: string) => `/user/${id}`,
        userDetails: (id: string) => `/user/${id}`,
    },
    contact: {
        addContact: "/contact",
        contactList: "/contacts",
        addBulkContact: "/contact/bulk",
        updateContact: (id: string) => `/contact/${id}`,
        contactDetails: (id: string) => `/contact/${id}`,
    },
    group: {
        addGroup: "/group",
        groupList: "/groups",
        updateGroup: (id: string) => `/group/${id}`,
        groupDetails: (id: string) => `/group/${id}`,

        addGroupMember: (id: string) => `/group/${id}/members`,
        groupMemberList: (id: string) => `/group/${id}/members`,
        deleteGroupMember: (id: string) => `/group/${id}/members`,
    },
}