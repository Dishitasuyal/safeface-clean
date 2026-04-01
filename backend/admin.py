from db import users_col, community_col

def get_dashboard_stats():

    total_users = users_col.count_documents({})

    pending_posts = community_col.count_documents({
        "status": "pending"
    })

    approved_posts = community_col.count_documents({
        "status": "approved"
    })

    return {
        "totalUsers": total_users,
        "pendingPosts": pending_posts,
        "approvedPosts": approved_posts
    }