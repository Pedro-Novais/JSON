const API = {

    // Endpoints de views
    url_view_profile: `/profile/user`,
    url_view_personalization: '/profile/personalization',
    url_view_list: '/list',
    url_view_ranking: '/ranking',
    url_singout: '/sign-out',

    //Endpoint das views do profile
    url_view_profile_user: '/profile/user',
    url_view_profile_statistic: '/profile/statistic',
    url_view_profile_config: '/profile/configurations', 

    url_get_user: '/api/user',
    url_get_user_personalization: '/api/user/personalization',
    url_get_task: '/api/user/tasks',
    url_statistic: '/api/user/statistic',
    url_config: '/api/user/config',

    url_verify_password: '/api/user/security',
    url_create_code: '/api/confirmation',
    url_verify_code: '/api/verify',
}

export { API }