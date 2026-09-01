export interface paths {
    "/auth/signup/otp/request": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Step 1 — request an email OTP for signup */
        post: operations["signup_otp_request_auth_signup_otp_request_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/signup/otp/verify": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Step 2 — verify OTP, receive email_verification_token */
        post: operations["signup_otp_verify_auth_signup_otp_verify_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/signup/check/business-name": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Check if a business name is available */
        get: operations["signup_check_business_name_auth_signup_check_business_name_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/signup/check/phone": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Check if a phone number is available */
        get: operations["signup_check_phone_auth_signup_check_phone_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/signup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Step 3 — org owner self-registration
         * @description Creates org + owner atomically. Owner is ACTIVE immediately.
         *     Returns tokens + slug for the new organization.
         */
        post: operations["signup_auth_signup_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/invite/otp/request": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Invite Step 1 — send OTP to invite email */
        post: operations["invite_otp_request_auth_invite_otp_request_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/invite/otp/verify": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Invite Step 2 — verify OTP, receive invite_verification_token */
        post: operations["invite_otp_verify_auth_invite_otp_verify_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/register/invite": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Invite Step 3 — complete registration with wellbeing baseline
         * @description Creates employee account + wellbeing baseline atomically.
         *     User is PENDING during the transaction, activated to ACTIVE before tokens are issued.
         */
        post: operations["register_invited_auth_register_invite_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Email + password login
         * @description Returns TokenResponse (2FA off) or TwoFaChallengeResponse (2FA on).
         *     Rate-limited at the reverse-proxy / middleware layer.
         */
        post: operations["login_auth_login_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login/google": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Google OAuth login — existing users only (Gmail auto-links)
         * @description Existing users only. No registration via OAuth.
         *     Gmail accounts are auto-linked on first OAuth login.
         *     Non-Gmail Google accounts are rejected.
         */
        post: operations["login_google_auth_login_google_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login/apple": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Apple Sign In — existing users with Apple pre-linked only
         * @description Existing users only. Apple must be linked in account settings first.
         *     No auto-linking for Apple (private relay emails are unreliable for matching).
         *     No registration via OAuth.
         */
        post: operations["login_apple_auth_login_apple_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/2fa/verify": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Complete a 2FA challenge after password login */
        post: operations["two_fa_verify_auth_2fa_verify_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/2fa/setup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Initiate 2FA enrollment for the authenticated user */
        post: operations["two_fa_setup_auth_2fa_setup_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/2fa/disable": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Disable 2FA for the authenticated user */
        post: operations["two_fa_disable_auth_2fa_disable_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/2fa/confirm": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Confirm and activate a pending 2FA enrollment */
        post: operations["two_fa_confirm_auth_2fa_confirm_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/sessions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List active login sessions */
        get: operations["list_sessions_auth_sessions_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/sessions/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Revoke a login session */
        delete: operations["revoke_session_auth_sessions__session_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Refresh access token
         * @description Rotates the refresh token — each token is single-use.
         *     Permissions re-loaded from DB on every rotation.
         */
        post: operations["refresh_auth_refresh_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Revoke refresh token (logout this device)
         * @description Idempotent — silently succeeds if token already expired or unrecognised.
         *     Access token remains valid until natural expiry.
         */
        post: operations["logout_route_auth_logout_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Current user identity, permissions, and 2FA status */
        get: operations["me_auth_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/departments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List departments in an organization */
        get: operations["list_departments_route_organizations__org_id__departments_get"];
        put?: never;
        /** Create a department */
        post: operations["create_department_route_organizations__org_id__departments_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/departments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List departments in a branch
         * @description Lists every department belonging to this branch. Department.branch_id is required, so this is the complete set for the branch — there's no separate org-level bucket to also check. Accessible to any authenticated member of the organization.
         */
        get: operations["list_branch_departments_route_organizations__org_id__branches__branch_id__departments_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/departments/{dept_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a department by ID */
        get: operations["get_department_route_organizations__org_id__departments__dept_id__get"];
        put?: never;
        post?: never;
        /**
         * Delete a department
         * @description Deletes a department. If it has members, `transfer_to_department_id` is required — all members are moved atomically before deletion so no user is ever left without a department. Requires `department.delete`, scoped to the department's own branch (or org-wide for org-level departments).
         */
        delete: operations["delete_department_route_organizations__org_id__departments__dept_id__delete"];
        options?: never;
        head?: never;
        /** Update a department */
        patch: operations["edit_department_route_organizations__org_id__departments__dept_id__patch"];
        trace?: never;
    };
    "/organizations/{org_id}/departments/{dept_id}/members/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Assign a user to a department
         * @description Assigns a user to the specified department. If the user already belongs to another department, they are moved atomically — never left without a department. Requires `department.update`, scoped to the department's own branch (or org-wide for org-level departments).
         */
        put: operations["assign_user_to_department_route_organizations__org_id__departments__dept_id__members__user_id__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/departments/{dept_id}/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List members of a department */
        get: operations["list_department_members_route_organizations__org_id__departments__dept_id__members_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/departments/{dept_id}/head/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Assign a department head
         * @description Designates a user as the head of this department. The user must already be a member of the department. Assigns the `team_leader` system role to them automatically. Requires `department.update`, scoped to the department's own branch (or org-wide for org-level departments).
         */
        put: operations["assign_department_head_route_organizations__org_id__departments__dept_id__head__user_id__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/departments/{dept_id}/head": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove the department head
         * @description Clears the department head designation. By default reverts the former head's role from `team_leader` back to `member`. Requires `department.update`, scoped to the department's own branch (or org-wide for org-level departments).
         */
        delete: operations["remove_department_head_route_organizations__org_id__departments__dept_id__head_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/invites": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List organization invites
         * @description Returns invites for the organization. Filter by status: pending, accepted, expired, cancelled. Omit status to return all. Requires `member.invite` permission.
         */
        get: operations["list_invites_route_organizations__org_id__invites_get"];
        put?: never;
        /**
         * Send an organization invite
         * @description Invite a new user to join the organization. The invitee receives an email with a secure invite link valid for 7 days. Requires `member.invite` permission either on org scope or branch scope.
         */
        post: operations["send_invite_route_organizations__org_id__invites_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/invites/{invite_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete a pending organization invite
         * @description Deletes an invite only while it is still pending. Accepted or otherwise used invites are retained for audit history.
         */
        delete: operations["delete_pending_invite_route_organizations__org_id__invites__invite_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all members of the organization
         * @description Returns every user belonging to the organization, across all branches and departments. Accessible to any authenticated member of the organization.
         */
        get: operations["list_organization_members_route_organizations__org_id__members_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/clubs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all clubs in organization */
        get: operations["list_clubs_route_organizations__org_id__clubs_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get organization-wide structural stats
         * @description Returns live counts (total users, branches, departments, clubs, events, challenges, posts) for the organization. Computed fresh on every request, not snapshotted. Accessible to only the admin with org_level permissoin.
         */
        get: operations["org_stats_route_organizations__org_id__stats_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get branch-level structural stats
         * @description Returns live counts (users, departments, clubs, events) scoped to one branch. Own branch always accessible; another branch requires super_admin.
         */
        get: operations["branch_stats_route_organizations__org_id__branches__branch_id__stats_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/roles/system": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List system roles
         * @description Returns all system-level roles. Useful for populating invite and role-assignment dropdowns.
         */
        get: operations["list_system_roles_roles_system_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/roles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Organization Roles */
        get: operations["list_organization_roles_organizations__org_id__roles_get"];
        put?: never;
        /** Create Organization Role */
        post: operations["create_organization_role_organizations__org_id__roles_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/roles/{role_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete Organization Role */
        delete: operations["delete_organization_role_organizations__org_id__roles__role_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/roles/{role_id}/copy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Copy Role */
        post: operations["copy_role_organizations__org_id__roles__role_id__copy_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/roles/{role_id}/permissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Update Role Permissions */
        put: operations["update_role_permissions_organizations__org_id__roles__role_id__permissions_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/members/{user_id}/system-role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Change Member System Role */
        put: operations["change_member_system_role_organizations__org_id__members__user_id__system_role_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/members/{user_id}/custom-role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Change Member Custom Role */
        put: operations["change_member_custom_role_organizations__org_id__members__user_id__custom_role_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/members/{user_id}/role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Revoke Member Role
         * @description Revoke the current scoped role and immediately fall back to Member.
         */
        delete: operations["revoke_member_role_organizations__org_id__members__user_id__role_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/permissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all permissions
         * @description Returns all available permissions. Useful for building role-assignment and invite UIs.
         */
        get: operations["list_permissions_permissions_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List branches in an organization
         * @description Accessible to any authenticated member of the organization.
         */
        get: operations["list_branches_route_organizations__org_id__branches_get"];
        put?: never;
        /**
         * Create a branch
         * @description Creates a new branch under the organization, with no manager assigned. Assign a manager afterward via PUT /branches/{branch_id}/manager. Requires `branch.create` granted org-wide.
         */
        post: operations["create_branch_route_organizations__org_id__branches_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a branch by ID
         * @description Accessible to any authenticated member of the organization.
         */
        get: operations["get_branch_route_organizations__org_id__branches__branch_id__get"];
        put?: never;
        post?: never;
        /**
         * Delete a branch
         * @description Deletes a branch. The branch must be fully empty before this call will succeed — pre-empty it in this order:
         *
         *     1. Unassign the manager (DELETE /branches/{branch_id}/manager).
         *     2. Delete every department via DELETE /departments/{dept_id} — use `transfer_to_department_id` on each call to move that department's members atomically to a department in another branch.
         *     3. Once no manager, no departments, and no members remain, this call deletes the branch cleanly.
         *
         *     The Headquarters branch can never be deleted. Requires `branch.delete` granted org-wide.
         */
        delete: operations["delete_branch_route_organizations__org_id__branches__branch_id__delete"];
        options?: never;
        head?: never;
        /**
         * Update a branch
         * @description Partially updates a branch's name. Manager assignment is handled separately via PUT/DELETE /branches/{branch_id}/manager. The Headquarters branch cannot be renamed. Requires `branch.update` scoped to this branch or org-wide.
         */
        patch: operations["edit_branch_route_organizations__org_id__branches__branch_id__patch"];
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List members of a branch
         * @description Accessible to any authenticated member of the organization.
         */
        get: operations["list_branch_members_route_organizations__org_id__branches__branch_id__members_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/members/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Transfer a user to this branch
         * @description Transfers a user to this branch and places them into the specified department within it. Both happen atomically — a user's department must always belong to their home branch.
         *
         *     Permission scope: `branch.update` is checked against the user's CURRENT (source) branch, not the destination. A branch manager decides who leaves their branch; they do not need authority over the receiving branch. An org-wide grant covers any transfer.
         */
        put: operations["assign_user_to_branch_route_organizations__org_id__branches__branch_id__members__user_id__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/manager": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Assign a branch manager
         * @description Assigns a user as manager of this branch. Fails if the branch already has a manager — unassign first. Requires `branch.manager.assign` granted org-wide.
         */
        put: operations["assign_branch_manager_route_organizations__org_id__branches__branch_id__manager_put"];
        post?: never;
        /**
         * Unassign the branch manager
         * @description Removes the current manager from this branch. Required before the branch can be deleted. Requires `branch.manager.assign` granted org-wide.
         */
        delete: operations["unassign_branch_manager_route_organizations__org_id__branches__branch_id__manager_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/activities/summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Branch Activity Summary Route */
        get: operations["branch_activity_summary_route_organizations__org_id__branches__branch_id__activities_summary_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/clubs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List clubs in a branch */
        get: operations["list_branch_clubs_route_organizations__org_id__branches__branch_id__clubs_get"];
        put?: never;
        /**
         * Create a club
         * @description Any member of the target branch can create a club there. A user who is not a member of the branch can still create one if they hold `club.create` — org-wide, or scoped to this branch. The creator automatically becomes the club leader and is added as the first member. category is required and must be one of: fitness, creativity, team_bonding, mental_health, nutrition.
         */
        post: operations["create_club_route_organizations__org_id__branches__branch_id__clubs_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/clubs/{club_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a club by ID */
        get: operations["get_club_route_organizations__org_id__clubs__club_id__get"];
        put?: never;
        post?: never;
        /**
         * Delete a club
         * @description Deletes a club and all its members (cascade). Allowed for: the club leader, a user with `club.delete` org-wide, or a branch manager with `club.delete` scoped to the club's branch. Branch-scoped grants are resolved via require_scoped_permission — no separate permission name needed.
         */
        delete: operations["delete_club_route_organizations__org_id__clubs__club_id__delete"];
        options?: never;
        head?: never;
        /**
         * Update a club
         * @description Club leader can edit their own club freely. Admins with `club.update` org-wide or branch-scoped can edit any club within their scope. category, if provided, must be one of: fitness, creativity, team_bonding, mental_health, nutrition.
         */
        patch: operations["edit_club_route_organizations__org_id__clubs__club_id__patch"];
        trace?: never;
    };
    "/organizations/{org_id}/clubs/{club_id}/members/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Join a club
         * @description Join a public club. User must belong to the branch that owns the club. Private clubs require an invite — this endpoint rejects them. Users can only join on their own behalf unless they hold `club.update`.
         */
        put: operations["join_club_route_organizations__org_id__clubs__club_id__members__user_id__put"];
        post?: never;
        /**
         * Remove a club member
         * @description Removes a member from a club. Allowed for the club leader, or a user holding `club.update` (org-wide or scoped to the club's branch). The leader cannot remove themselves via this endpoint.
         */
        delete: operations["remove_club_member_route_organizations__org_id__clubs__club_id__members__user_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/clubs/{club_id}/members/{user_id}/leave": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Leave a club
         * @description A user leaves a club they are a member of. Club leader cannot leave — they must delete the club instead.
         */
        delete: operations["leave_club_route_organizations__org_id__clubs__club_id__members__user_id__leave_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/clubs/{club_id}/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List club members
         * @description Public clubs: visible to any member of the organization. Private clubs: visible only to the club leader, existing members, or a user holding `club.update` (org-wide or scoped to the club's branch).
         */
        get: operations["list_club_members_route_organizations__org_id__clubs__club_id__members_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/members/{user_id}/permissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a user's permissions
         * @description Returns all permissions granted to the target user, with scope details (org-wide vs branch-scoped, which branch, who granted it). Requires `member.role.assign`. If your grant is org-wide you can see the target's full permission set. If your grant is branch-scoped you can only see permissions the target holds that are scoped to your branch(es) or org-wide.
         */
        get: operations["get_user_permissions_route_organizations__org_id__members__user_id__permissions_get"];
        put?: never;
        /**
         * Grant a permission to a user
         * @description Grants `permission_name` to the target user. Omit `branch_id` for an org-wide grant, or provide it to scope the grant to that branch (only valid for permissions with catalogue scope 'both'). Requires `member.permission.grant`.
         */
        post: operations["grant_permission_route_organizations__org_id__members__user_id__permissions_post"];
        /**
         * Revoke a permission from a user
         * @description Revokes an exact permission grant — permission_name + scope must match the grant exactly (branch_id null for org-wide, or the specific branch_id). Requires `member.permission.revoke`.
         */
        delete: operations["revoke_permission_route_organizations__org_id__members__user_id__permissions_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List events in the organization
         * @description Returns a paginated list of events belonging to the organization.
         *
         *     **Who can call this:**
         *     Any authenticated member of the organization. No special permission required.
         *
         *     **Query parameters:**
         *     | Parameter   | Type        | Default | Notes |
         *     |-------------|-------------|---------|-------|
         *     | `branch_id` | UUID string | —       | Optional. Filter events to a specific branch. Omit to return events from all branches. |
         *     | `offset`    | integer     | `0`     | Pagination offset. Must be ≥ 0. |
         *     | `limit`     | integer     | `50`    | Number of results per page. Min `1`, max `200`. |
         *
         *     **Tip:** To see only your branch's events, pass `?branch_id=<your_branch_id>`.
         */
        get: operations["list_events_route_organizations__org_id__events_get"];
        put?: never;
        /**
         * Create an event
         * @description Create a new event scoped to a specific branch within the organization.
         *
         *     **Who can call this:**
         *     Requires the `event.create` permission, granted either org-wide or scoped
         *     to the target branch. Super admins always pass this check.
         *
         *     **Request body fields:**
         *     | Field             | Type         | Required | Notes |
         *     |-------------------|--------------|----------|-------|
         *     | `title`           | string       | ✅       | Display name of the event. Max 255 chars. |
         *     | `branch_id`       | UUID string  | ✅       | The branch this event belongs to. Every event must have a branch. |
         *     | `start_date`      | date         | ✅       | Format: `YYYY-MM-DD`. First occurrence if recurring. |
         *     | `time`            | time         | ✅       | Format: `HH:MM:SS`. Start time of the event. |
         *     | `description`     | string       | ❌       | Optional longer text description. |
         *     | `image_url`       | string       | ❌       | URL to a cover image. Max 2048 chars. |
         *     | `end_date`        | date         | ❌       | Format: `YYYY-MM-DD`. Last occurrence if recurring; null = one-time or open-ended. |
         *     | `recurrence_rule` | string       | ❌       | Null = one-time event. Pattern examples: `weekly_monday`, `monthly_first`. |
         *
         *     **Branch rule:**
         *     Only users whose home branch matches `branch_id` can later join this event.
         *     Cross-branch joins are blocked at the service layer.
         */
        post: operations["create_event_route_organizations__org_id__events_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/events/{event_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a single event
         * @description Fetch the full details of a single event by its ID.
         *
         *     **Who can call this:**
         *     Any authenticated member of the organization. No special permission required.
         *
         *     **Path parameters:**
         *     | Parameter  | Type        | Notes |
         *     |------------|-------------|-------|
         *     | `org_id`   | UUID string | The organization the event belongs to. |
         *     | `event_id` | UUID string | The event to retrieve. |
         *
         *     Returns `404` if the event doesn't exist or doesn't belong to this organization.
         */
        get: operations["get_event_route_organizations__org_id__events__event_id__get"];
        put?: never;
        post?: never;
        /**
         * Permanently delete an event
         * @description Hard deletes the event and all associated data (participants, attendance
         *     records). This action is **irreversible**.
         *
         *     **Who can call this:**
         *     Requires the `event.delete` permission scoped to the event's branch (or org-wide).
         *     Super admins always pass this check.
         *
         *     **When to use this vs /cancel:**
         *     - Prefer `/cancel` if the event has any participants or attendance history
         *       worth preserving.
         *     - Use this only when the event was created in error and has no meaningful data.
         *
         *     Returns `204 No Content` on success. No response body.
         */
        delete: operations["delete_event_route_organizations__org_id__events__event_id__delete"];
        options?: never;
        head?: never;
        /**
         * Update an event
         * @description Partially update an existing event. Only fields included in the request body
         *     are changed — all others remain untouched.
         *
         *     **Who can call this:**
         *     Requires the `event.update` permission scoped to the event's branch (or org-wide).
         *     Super admins always pass this check.
         *
         *     **Updatable fields:**
         *     | Field             | Type   | Notes |
         *     |-------------------|--------|-------|
         *     | `title`           | string | New display name. Max 255 chars. |
         *     | `description`     | string | New description text. |
         *     | `image_url`       | string | New cover image URL. Max 2048 chars. |
         *     | `start_date`      | date   | Format: `YYYY-MM-DD`. |
         *     | `end_date`        | date   | Format: `YYYY-MM-DD`. Set to `null` to remove. |
         *     | `recurrence_rule` | string | Set to `null` to make it a one-time event. |
         *     | `time`            | time   | Format: `HH:MM:SS`. |
         *     | `status`          | string | Allowed values: `scheduled` \| `ongoing` \| `completed` \| `cancelled`. Prefer the dedicated `/cancel` endpoint to cancel — use this only when correcting a status. |
         *
         *     **Note:** `branch_id` and `organization_id` cannot be changed after creation.
         */
        patch: operations["edit_event_route_organizations__org_id__events__event_id__patch"];
        trace?: never;
    };
    "/organizations/{org_id}/events/{event_id}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Cancel an event
         * @description Sets the event's status to `cancelled`. The event record and all participant
         *     history are preserved — this is a soft action, not a delete.
         *
         *     **Who can call this:**
         *     Requires `event.update` scoped to the event's branch (or org-wide).
         *
         *     **When to use this vs DELETE:**
         *     - Use `/cancel` when the event has participants, attendance records, or any
         *       history worth keeping (e.g. it happened but was cut short, or was called
         *       off last minute).
         *     - Use `DELETE` only when the event was created by mistake and has no
         *       meaningful history to preserve.
         *
         *     **No request body required.** The status is always set to `cancelled`.
         *
         *     Returns the updated event object with `status: "cancelled"`.
         */
        post: operations["cancel_event_route_organizations__org_id__events__event_id__cancel_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/events/{event_id}/participants": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List participants of an event
         * @description Returns a paginated list of users who have joined or been invited to this event,
         *     along with their RSVP status and attendance flag.
         *
         *     **Who can call this:**
         *     Any authenticated member of the organization. No special permission required.
         *
         *     **Query parameters:**
         *     | Parameter | Type    | Default | Notes |
         *     |-----------|---------|---------|-------|
         *     | `offset`  | integer | `0`     | Pagination offset. Must be ≥ 0. |
         *     | `limit`   | integer | `50`    | Results per page. Min `1`, max `200`. |
         *
         *     **Response fields per participant:**
         *     | Field        | Type    | Notes |
         *     |--------------|---------|-------|
         *     | `user_id`    | string  | UUID of the participant. |
         *     | `first_name` | string  | |
         *     | `last_name`  | string  | |
         *     | `email`      | string  | |
         *     | `status`     | string  | RSVP status: `invited` \| `accepted` \| `declined` \| `pending`. |
         *     | `attended`   | boolean | `true` once attendance has been marked post-event. |
         *     | `invited_at` | string  | ISO 8601 timestamp if the user was formally invited; `null` for self-joins. |
         */
        get: operations["list_event_participants_route_organizations__org_id__events__event_id__participants_get"];
        put?: never;
        /**
         * Join an event or invite a user to it
         * @description Adds a user as a participant in this event. Supports two modes controlled
         *     by the `is_invite` flag in the request body.
         *
         *     **Who can call this:**
         *     Any authenticated member of the organization. No special permission required
         *     for self-joins. Admins can use `is_invite: true` to add other users on their behalf.
         *
         *     **Branch rule:**
         *     The user being invited or joined must belong to the same organization as the event.
         *
         *     **Request body:**
         *     | Field       | Type    | Required | Notes |
         *     |-------------|---------|----------|-------|
         *     | `user_id`   | string  | ✅       | UUID of the user to add. Pass the current user's own ID for a self-join. |
         *     | `is_invite` | boolean | ❌       | Default: `false`. Set to `true` when an admin is adding someone else — sets `status` to `"invited"` and records `invited_at`. Self-joins get `status: "pending"`. |
         *
         *     **Status assigned automatically:**
         *     - `is_invite: false` → `status: "pending"`
         *     - `is_invite: true`  → `status: "invited"`, `invited_at` set to now
         *
         *     Returns `409 Conflict` if the user is already a participant.
         */
        post: operations["join_event_route_organizations__org_id__events__event_id__participants_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/events/{event_id}/participants/{user_id}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Update a participant's RSVP status
         * @description Update the RSVP status of a participant. Typically called by the participant
         *     themselves in response to an invitation, or by an organizer correcting a status.
         *
         *     **Who can call this:**
         *     Any authenticated member of the organization. No special permission required.
         *     (If you want this restricted to the participant themselves or an admin, request that.)
         *
         *     **Path parameters:**
         *     | Parameter | Notes |
         *     |-----------|-------|
         *     | `user_id` | UUID of the participant whose status is being updated. |
         *
         *     **Request body:**
         *     | Field    | Type   | Required | Allowed values |
         *     |----------|--------|----------|----------------|
         *     | `status` | string | ✅       | `invited` \| `accepted` \| `declined` \| `pending` |
         *
         *     **Status meanings:**
         *     - `pending`  — joined but hasn't responded yet (default for self-joins)
         *     - `invited`  — formally invited, awaiting response
         *     - `accepted` — confirmed attendance
         *     - `declined` — declined the invitation
         *
         *     Returns `404` if the user is not a participant in this event.
         */
        patch: operations["update_participant_status_route_organizations__org_id__events__event_id__participants__user_id__status_patch"];
        trace?: never;
    };
    "/organizations/{org_id}/events/{event_id}/participants/{user_id}/attendance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Mark a participant's attendance
         * @description Records whether a participant actually attended the event after it has taken place.
         *     This is a post-event organizer action — it is separate from RSVP status, which
         *     reflects intent *before* the event.
         *
         *     **Who can call this:**
         *     Requires the `event.update` permission scoped to the event's branch (or org-wide).
         *     This is intentionally restricted to organizers — participants cannot mark their
         *     own attendance.
         *
         *     **Path parameters:**
         *     | Parameter | Notes |
         *     |-----------|-------|
         *     | `user_id` | UUID of the participant to mark attendance for. |
         *
         *     **Request body:**
         *     | Field      | Type    | Required | Notes |
         *     |------------|---------|----------|-------|
         *     | `attended` | boolean | ✅       | `true` = participant was present. `false` = no-show. |
         *
         *     **Note:** The `attended` flag is independent of RSVP `status`. A participant
         *     can have `status: "accepted"` but `attended: false` (no-show), or
         *     `status: "declined"` but `attended: true` (walk-in).
         *
         *     Returns `404` if the user is not a participant in this event.
         */
        patch: operations["mark_attendance_route_organizations__org_id__events__event_id__participants__user_id__attendance_patch"];
        trace?: never;
    };
    "/organizations/{org_id}/events/{event_id}/participants/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Remove a participant or leave an event
         * @description Removes a user from the event's participant list. Supports two use cases:
         *
         *     1. **Self-removal** — a user leaving an event they joined.
         *     2. **Admin removal** — an organizer removing someone else.
         *
         *     **Who can call this:**
         *     Any authenticated member of the organization. No special permission is currently
         *     required — the service layer does not yet restrict self-removal vs admin-removal.
         *     (If you want admin-removal gated behind `event.update`, request that.)
         *
         *     **Path parameters:**
         *     | Parameter | Notes |
         *     |-----------|-------|
         *     | `user_id` | UUID of the participant to remove. |
         *
         *     **Note:** This only removes the participation record. It does not affect the
         *     user's account, branch membership, or any other data. The event itself is
         *     unaffected.
         *
         *     Returns `204 No Content` on success. Returns `404` if the user is not
         *     a participant in this event.
         */
        delete: operations["remove_participant_route_organizations__org_id__events__event_id__participants__user_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List posts in the organization
         * @description scope='org_only' returns ONLY org-wide posts (branch_id IS NULL) — use this for the Overview/org-wide space view. scope='branch_and_org' (default) returns the given branch_id's posts PLUS org-wide posts — use this for a branch's space view.
         */
        get: operations["list_posts_route_organizations__org_id__posts_get"];
        put?: never;
        /**
         * Create a post
         * @description branch_id omitted/null = org-level post, open to any org member. branch_id set = must belong to that branch (or be super_admin). No permission grant required either way.
         */
        post: operations["create_post_route_organizations__org_id__posts_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/posts/saved": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List my saved posts */
        get: operations["list_saved_posts_route_organizations__org_id__posts_saved_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/posts/likes/given/count": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Count of posts I've liked
         * @description Current user only. Optionally restrict to a date window via period_start/period_end (both inclusive) — e.g. 'likes given this week'.
         */
        get: operations["get_likes_given_count_route_organizations__org_id__posts_likes_given_count_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/posts/users/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List posts by a specific user
         * @description All posts authored by the given user in this org, across branches. Optionally restrict to a date window via period_start/period_end (both inclusive) — e.g. for a 'posts this week' stat, pass this week's Monday and Sunday.
         */
        get: operations["list_posts_by_user_route_organizations__org_id__posts_users__user_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/posts/{post_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Post Route */
        get: operations["get_post_route_organizations__org_id__posts__post_id__get"];
        put?: never;
        post?: never;
        /**
         * Delete a post
         * @description Author can delete their own post freely. Deleting another user's post requires `post.moderate`.
         */
        delete: operations["delete_post_route_organizations__org_id__posts__post_id__delete"];
        options?: never;
        head?: never;
        /**
         * Edit a post
         * @description Author only. Editing someone else's post isn't a moderation action — deletion is.
         */
        patch: operations["edit_post_route_organizations__org_id__posts__post_id__patch"];
        trace?: never;
    };
    "/organizations/{org_id}/posts/{post_id}/like": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Like Post Route */
        post: operations["like_post_route_organizations__org_id__posts__post_id__like_post"];
        /** Unlike Post Route */
        delete: operations["unlike_post_route_organizations__org_id__posts__post_id__like_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/posts/{post_id}/likes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Post Likers Route */
        get: operations["list_post_likers_route_organizations__org_id__posts__post_id__likes_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/posts/{post_id}/comments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Comments Route */
        get: operations["list_comments_route_organizations__org_id__posts__post_id__comments_get"];
        put?: never;
        /** Add a comment, or reply to one */
        post: operations["add_comment_route_organizations__org_id__posts__post_id__comments_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/posts/{post_id}/comments/{comment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete a comment
         * @description Own comment: always allowed. Someone else's comment: requires `post.moderate`.
         */
        delete: operations["delete_comment_route_organizations__org_id__posts__post_id__comments__comment_id__delete"];
        options?: never;
        head?: never;
        /** Edit your own comment */
        patch: operations["edit_comment_route_organizations__org_id__posts__post_id__comments__comment_id__patch"];
        trace?: never;
    };
    "/organizations/{org_id}/posts/{post_id}/share": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Share Post Route */
        post: operations["share_post_route_organizations__org_id__posts__post_id__share_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/posts/{post_id}/save": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Save Post Route */
        post: operations["save_post_route_organizations__org_id__posts__post_id__save_post"];
        /** Unsave Post Route */
        delete: operations["unsave_post_route_organizations__org_id__posts__post_id__save_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/hashtags/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Search Hashtags Route */
        get: operations["search_hashtags_route_organizations__org_id__hashtags_search_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/hashtags/trending": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Trending Hashtags Route */
        get: operations["trending_hashtags_route_organizations__org_id__hashtags_trending_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/hashtags/{tag_name}/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Posts By Hashtag Route */
        get: operations["posts_by_hashtag_route_organizations__org_id__hashtags__tag_name__posts_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/stories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Stories Route */
        get: operations["list_stories_route_organizations__org_id__stories_get"];
        put?: never;
        /** Create Story Route */
        post: operations["create_story_route_organizations__org_id__stories_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/stories/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** My Stories Route */
        get: operations["my_stories_route_organizations__org_id__stories_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/stories/{story_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Story Route */
        get: operations["get_story_route_organizations__org_id__stories__story_id__get"];
        put?: never;
        post?: never;
        /** Delete Story Route */
        delete: operations["delete_story_route_organizations__org_id__stories__story_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/conversations/{conversation_type}/{conversation_id}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Messages Route */
        get: operations["list_messages_route_organizations__org_id__conversations__conversation_type___conversation_id__messages_get"];
        put?: never;
        /** Send Message Route */
        post: operations["send_message_route_organizations__org_id__conversations__conversation_type___conversation_id__messages_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/conversations/messages/{message_id}/pin": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Pin a message
         * @description The club's leader can pin messages in their own club's chat with no permission grant needed. Otherwise requires `chat.moderate` scoped to the conversation's branch (or org-wide). Unpins any previously pinned message in the same conversation.
         */
        post: operations["pin_message_route_organizations__org_id__conversations_messages__message_id__pin_post"];
        /**
         * Unpin a message
         * @description Club leader (own club) or `chat.moderate` scoped to the conversation's branch (or org-wide).
         */
        delete: operations["unpin_message_route_organizations__org_id__conversations_messages__message_id__pin_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/conversations/messages/{message_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete a chat message
         * @description Three paths grant deletion access (checked in order):
         *     1. **Club leader** — delete any message in their own club's chat.
         *     2. **Event creator** — delete any message in their own event's chat.
         *     3. **`chat.moderate`** — branch-scoped or org-wide permission grant.
         */
        delete: operations["delete_message_route_organizations__org_id__conversations_messages__message_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/push-tokens": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Register Push Token Route */
        put: operations["register_push_token_route_notifications_push_tokens_put"];
        post?: never;
        /** Unregister Push Token Route */
        delete: operations["unregister_push_token_route_notifications_push_tokens_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Notifications Route */
        get: operations["list_notifications_route_notifications_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/unread-count": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Unread Count Route */
        get: operations["unread_count_route_notifications_unread_count_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/{notification_id}/read": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Mark Notification Read Route */
        patch: operations["mark_notification_read_route_notifications__notification_id__read_patch"];
        trace?: never;
    };
    "/notifications/read-all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Mark All Notifications Read Route */
        patch: operations["mark_all_notifications_read_route_notifications_read_all_patch"];
        trace?: never;
    };
    "/notifications/{notification_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete Notification Route */
        delete: operations["delete_notification_route_notifications__notification_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/challenges": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List challenges
         * @description List challenges for an organization.
         *
         *     - If `branch_id` is omitted and `scope` is omitted: default visibility rules apply (super_admin sees everything; other roles see their own branch's challenges plus org-wide ones).
         *     - `scope=organization`: only org-wide challenges (`branch_id` is null). If `branch_id` is also passed, returns that branch's challenges PLUS the org-wide ones.
         *     - `scope=all`: every challenge in the organization, ignoring branch boundaries entirely. Ignored if `branch_id` is passed.
         *     - `status`: filter by challenge status. If omitted, challenges of all statuses are returned.
         */
        get: operations["list_challenges_route_organizations__org_id__challenges_get"];
        put?: never;
        /**
         * Create a challenge
         * @description Creates an org-level or branch-scoped wellness/fitness challenge. Requires `challenge.create`, scoped to `branch_id` (or org-wide if `branch_id` is omitted).
         *
         *     **Required fields:** `name`, `target_type`.
         *
         *     **branch_id** — omit for an org-wide challenge visible to every branch; set to scope the challenge to one branch only.
         *
         *     **target_type** — determines how completion is evaluated:
         *     - `cumulative`: total value across the whole challenge window must reach `target_value` (e.g. 50,000 steps in total). Completes the moment the target is crossed, any time before `end_date`.
         *     - `daily_minimum`: `target_value` must be independently met **every day** within the window (e.g. 5,000 steps every day). Requires `end_date` to be set — completion is only finalized once the window closes.
         *
         *     **target_value** — the numeric goal `target_type` is evaluated against. Optional; if omitted, the challenge has no automatic completion and must be marked complete manually.
         *
         *     **metric_type** — freeform label describing what's being measured, e.g. `steps`, `minutes_active`, `workshop_attendance`, `water_intake_liters`. Not a fixed enum — pick a consistent label per challenge type, since the frontend/mobile client uses this to decide how to collect and submit progress.
         *
         *     **status** is not settable here — every new challenge starts as `draft` and is activated separately.
         *
         *     **wellbeing_challenge_id** — optional link to a global challenge category/theme (e.g. "Fitness", "Mental Health") for grouping and filtering; leave null for an uncategorized challenge.
         */
        post: operations["create_challenge_route_organizations__org_id__challenges_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/challenges/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Challenge Stats Route */
        get: operations["get_challenge_stats_route_organizations__org_id__challenges_stats_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/challenges/{challenge_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Challenge Route */
        get: operations["get_challenge_route_organizations__org_id__challenges__challenge_id__get"];
        put?: never;
        post?: never;
        /**
         * Permanently delete a challenge
         * @description Hard delete — also removes all participant and progress records. Refuses with 409 if any participant has already completed the challenge; use `/cancel` instead in that case. Requires `challenge.delete`.
         */
        delete: operations["delete_challenge_route_organizations__org_id__challenges__challenge_id__delete"];
        options?: never;
        head?: never;
        /** Edit Challenge Route */
        patch: operations["edit_challenge_route_organizations__org_id__challenges__challenge_id__patch"];
        trace?: never;
    };
    "/organizations/{org_id}/challenges/{challenge_id}/join": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Join Challenge Route */
        post: operations["join_challenge_route_organizations__org_id__challenges__challenge_id__join_post"];
        /** Leave Challenge Route */
        delete: operations["leave_challenge_route_organizations__org_id__challenges__challenge_id__join_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/challenges/{challenge_id}/progress": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Submit today's progress
         * @description Upserts today's (WAT) progress entry for the caller and checks for automatic completion (cumulative challenges only — see TODO(background-job) for daily_minimum finalization). entry_date is always computed server-side, never accepted from the client.
         */
        post: operations["submit_progress_route_organizations__org_id__challenges__challenge_id__progress_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/challenges/{challenge_id}/participants": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Participants Route */
        get: operations["list_participants_route_organizations__org_id__challenges__challenge_id__participants_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/challenges/{challenge_id}/participants/{user_id}/complete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Mark Participant Complete Route
         * @description Manual admin override
         */
        post: operations["mark_participant_complete_route_organizations__org_id__challenges__challenge_id__participants__user_id__complete_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/challenges/{challenge_id}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Cancel a challenge
         * @description Sets status='cancelled'. Preferred over DELETE when the challenge has completions or active participants worth keeping — preserves all participant and progress history. Requires `challenge.update`.
         */
        post: operations["cancel_challenge_route_organizations__org_id__challenges__challenge_id__cancel_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/challenges/{challenge_id}/progress/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * My progress in this challenge
         * @description Shows current standing: total logged so far, percent complete (cumulative challenges only — daily_minimum returns null, see service docstring), and days remaining.
         */
        get: operations["my_progress_route_organizations__org_id__challenges__challenge_id__progress_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/challenges/{challenge_id}/progress/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Participant Progress Route
         * @description View a specific participant's progress. Requires `challenge.update` scoped to the challenge's branch.
         */
        get: operations["participant_progress_route_organizations__org_id__challenges__challenge_id__progress__user_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/activities/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List My Activities Route */
        get: operations["list_my_activities_route_organizations__org_id__activities_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/activities/summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Organization Activity Summary Route */
        get: operations["organization_activity_summary_route_organizations__org_id__activities_summary_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/activities/users/{user_id}/count": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** User Activity Count Route */
        get: operations["user_activity_count_route_organizations__org_id__activities_users__user_id__count_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/activity-log": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Submit Activity Route
         * @description Submits today's value for one metric_type (e.g. steps). Upserts today's ActivityLog entry AND automatically feeds progress into any active challenge the caller is participating in with a matching metric_type — no separate challenge submission needed.
         */
        post: operations["submit_activity_route_organizations__org_id__activity_log_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/activity-log/trend": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Activity Trend Route */
        get: operations["get_activity_trend_route_organizations__org_id__activity_log_trend_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/leaderboard/branch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Branch Leaderboard Route */
        get: operations["branch_leaderboard_route_organizations__org_id__leaderboard_branch_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/leaderboard/org": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Org Leaderboard Route */
        get: operations["org_leaderboard_route_organizations__org_id__leaderboard_org_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/wellbeing/dimensions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Dimensions Route */
        get: operations["list_dimensions_route_wellbeing_dimensions_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/wellbeing/challenges": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Wellbeing Challenges Route */
        get: operations["list_wellbeing_challenges_route_wellbeing_challenges_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/wellbeing/opted-in-challenges": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Opted In Route */
        get: operations["list_opted_in_route_organizations__org_id__wellbeing_opted_in_challenges_get"];
        put?: never;
        /** Opt In Route */
        post: operations["opt_in_route_organizations__org_id__wellbeing_opted_in_challenges_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/wellbeing/opted-in-challenges/{wellbeing_challenge_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Opt Out Route */
        delete: operations["opt_out_route_organizations__org_id__wellbeing_opted_in_challenges__wellbeing_challenge_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/wellbeing/baselines": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Submit Baseline Route */
        post: operations["submit_baseline_route_wellbeing_baselines_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/wellbeing/baselines/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** My Baselines Route */
        get: operations["my_baselines_route_wellbeing_baselines_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/wellbeing/assessments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Submit Assessment Route */
        post: operations["submit_assessment_route_wellbeing_assessments_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/wellbeing/assessments/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** My Assessments Route */
        get: operations["my_assessments_route_wellbeing_assessments_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/wellbeing/scores/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** My Scores Route */
        get: operations["my_scores_route_wellbeing_scores_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/wellbeing/scores/aggregate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Branch Aggregate Score Route
         * @description Average only, never individual scores. Suppressed if fewer than the anonymity threshold have a score for this dimension/period. Requires wellbeing.view_team scoped to this branch (or org-wide).
         */
        get: operations["branch_aggregate_score_route_organizations__org_id__branches__branch_id__wellbeing_scores_aggregate_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/wellbeing/scores/aggregate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Org Aggregate Score Route
         * @description Same anonymity-threshold rule as the branch aggregate, applied org-wide. Requires wellbeing.view_team held ORG-WIDE — a branch-scoped grant is not sufficient here, since this endpoint returns a figure blended across every branch, not just the one the grant covers.
         */
        get: operations["org_aggregate_score_route_organizations__org_id__wellbeing_scores_aggregate_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/wellbeing-survey/config": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Cadence Route */
        get: operations["get_cadence_route_organizations__org_id__wellbeing_survey_config_get"];
        /** Set Cadence Route */
        put: operations["set_cadence_route_organizations__org_id__wellbeing_survey_config_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/wellbeing-survey/open-window": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Open Window Route */
        get: operations["get_open_window_route_organizations__org_id__wellbeing_survey_open_window_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/wellbeing-survey/responses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Submit Response Route */
        post: operations["submit_response_route_organizations__org_id__wellbeing_survey_responses_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/wellbeing-survey/responses/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** My Responses Route */
        get: operations["my_responses_route_organizations__org_id__wellbeing_survey_responses_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/wellbeing-survey/pulse/live": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Live Pulse Route */
        get: operations["live_pulse_route_organizations__org_id__wellbeing_survey_pulse_live_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/wellbeing-survey/pulse/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Pulse History Route */
        get: operations["pulse_history_route_organizations__org_id__wellbeing_survey_pulse_history_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Categories Route */
        get: operations["list_categories_route_categories_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/health-categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Health Categories Route */
        get: operations["list_health_categories_route_health_categories_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/engagement/priorities": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Priorities Route */
        get: operations["list_priorities_route_engagement_priorities_get"];
        /** Set Priorities Route */
        put: operations["set_priorities_route_engagement_priorities_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/engagement/checkins": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Checkins Route */
        get: operations["list_checkins_route_engagement_checkins_get"];
        put?: never;
        /**
         * Submit Checkin Route
         * @description Submits today's check-in. Calling this again the same day updates the existing entry instead of creating a duplicate.
         */
        post: operations["submit_checkin_route_engagement_checkins_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/engagement/checkins/streak": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Checkin Streak Route */
        get: operations["checkin_streak_route_engagement_checkins_streak_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/engagement-log/trend": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Engagement Trend Route */
        get: operations["get_engagement_trend_route_engagement_log_trend_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/engagement-log/snapshot": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Engagement Snapshot Route */
        get: operations["get_engagement_snapshot_route_engagement_log_snapshot_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/storage/upload-url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Request Upload Url Route */
        post: operations["request_upload_url_route_storage_upload_url_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/targets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Targets Route */
        get: operations["list_targets_route_organizations__org_id__branches__branch_id__targets_get"];
        /** Set Target Route */
        put: operations["set_target_route_organizations__org_id__branches__branch_id__targets_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/targets/{target_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete Target Route */
        delete: operations["delete_target_route_organizations__org_id__targets__target_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/targets/progress": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Target Progress Route */
        get: operations["target_progress_route_organizations__org_id__branches__branch_id__targets_progress_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/dashboard/bootstrap": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Dashboard Bootstrap Route */
        get: operations["dashboard_bootstrap_route_organizations__org_id__dashboard_bootstrap_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/dashboard/engagement-wellbeing-trends": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Engagement Wellbeing Trends Route */
        get: operations["engagement_wellbeing_trends_route_organizations__org_id__dashboard_engagement_wellbeing_trends_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/department-rank": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Organization Department Ranks Route */
        get: operations["organization_department_ranks_route_organizations__org_id__department_rank_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/departments/{dept_id}/rank": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Department Latest Rank Route */
        get: operations["department_latest_rank_route_organizations__org_id__departments__dept_id__rank_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/departments/{dept_id}/rank-history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Department Rank History Route */
        get: operations["department_rank_history_route_organizations__org_id__departments__dept_id__rank_history_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/kpi-snapshots/overview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kpi Overview Route */
        get: operations["kpi_overview_route_organizations__org_id__kpi_snapshots_overview_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/branches/{branch_id}/kpi-snapshots": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Branch Kpi Snapshots Route */
        get: operations["list_branch_kpi_snapshots_route_organizations__org_id__branches__branch_id__kpi_snapshots_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/kpi-snapshots/org-wide": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Org Wide Kpi Snapshots Route */
        get: operations["get_org_wide_kpi_snapshots_route_organizations__org_id__kpi_snapshots_org_wide_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app-admin/support/tickets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List Support Tickets
         * @description Temporary key-protected endpoint until the app-admin authentication flow exists.
         */
        get: operations["list_support_tickets_app_admin_support_tickets_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app-admin/support/tickets/{ticket_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update Support Ticket */
        patch: operations["update_support_ticket_app_admin_support_tickets__ticket_id__patch"];
        trace?: never;
    };
    "/support/tickets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create Ticket */
        post: operations["create_ticket_support_tickets_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/integrations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Integrations */
        get: operations["list_integrations_organizations__org_id__integrations_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/integrations/{provider}/connect": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Connect Integration */
        post: operations["connect_integration_organizations__org_id__integrations__provider__connect_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/integrations/{provider}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Disconnect Integration */
        delete: operations["disconnect_integration_organizations__org_id__integrations__provider__delete"];
        options?: never;
        head?: never;
        /** Toggle Integration */
        patch: operations["toggle_integration_organizations__org_id__integrations__provider__patch"];
        trace?: never;
    };
    "/organizations/{org_id}/subscription": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Subscription Route */
        get: operations["get_subscription_route_organizations__org_id__subscription_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Transactions Route */
        get: operations["list_transactions_route_organizations__org_id__transactions_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/transactions/{reference}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Transaction By Reference Route */
        get: operations["get_transaction_by_reference_route_organizations__org_id__transactions__reference__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/transactions/{reference}/verify": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Verify Transaction By Reference Route */
        post: operations["verify_transaction_by_reference_route_organizations__org_id__transactions__reference__verify_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/checkout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Initiate Checkout Route */
        post: operations["initiate_checkout_route_organizations__org_id__checkout_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/subscription/cancel-auto-renew": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cancel Auto Renew Route */
        post: operations["cancel_auto_renew_route_organizations__org_id__subscription_cancel_auto_renew_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{org_id}/subscription/auto-renew": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update Auto Renew Route */
        patch: operations["update_auto_renew_route_organizations__org_id__subscription_auto_renew_patch"];
        trace?: never;
    };
    "/webhooks/paystack": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Paystack Webhook Route */
        post: operations["paystack_webhook_route_webhooks_paystack_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plans": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List Available Plans Route
         * @description No org scoping — plans are a global, platform-wide catalogue,
         *     same as WellbeingDimension. Registered outside the org-prefixed
         *     router since it isn't org-specific data.
         */
        get: operations["list_available_plans_route_plans_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user-settings/preferences": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Preferences Route */
        get: operations["get_preferences_route_user_settings_preferences_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update Preferences Route */
        patch: operations["update_preferences_route_user_settings_preferences_patch"];
        trace?: never;
    };
    "/user-settings/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Profile Route */
        get: operations["get_profile_route_user_settings_profile_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update Profile Route */
        patch: operations["update_profile_route_user_settings_profile_patch"];
        trace?: never;
    };
    "/user-settings/avatar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Update Avatar Route */
        put: operations["update_avatar_route_user_settings_avatar_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user-settings/change-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Change Password Route */
        post: operations["change_password_route_user_settings_change_password_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/forgot-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Forgot Password Route */
        post: operations["forgot_password_route_auth_forgot_password_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/reset-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Reset Password Route */
        post: operations["reset_password_route_auth_reset_password_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Root
         * @description Root route — simple hello response to confirm the app is up.
         */
        get: operations["root__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * AccessTokenResponse
         * @description Access token only — returned by /auth/refresh (token not rotated).
         */
        AccessTokenResponse: {
            /** Access Token */
            access_token: string;
            /**
             * Token Type
             * @default bearer
             */
            token_type: string;
        };
        /** ActivityItemResponse */
        ActivityItemResponse: {
            /** Id */
            id: string;
            /** Activity Type */
            activity_type: string;
            /** Reference Id */
            reference_id: string | null;
            /** Reference Type */
            reference_type: string | null;
            /** Activity Metadata */
            activity_metadata: Record<string, never> | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
        };
        /** ActivityListResponse */
        ActivityListResponse: {
            /** Items */
            items: components["schemas"]["ActivityItemResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** ActivityLogResponse */
        ActivityLogResponse: {
            /** Id */
            id: string;
            /** Metric Type */
            metric_type: string;
            /** Value */
            value: string;
            /** Unit */
            unit: string | null;
            /**
             * Date
             * Format: date
             */
            date: string;
        };
        /** ActivitySubmitRequest */
        ActivitySubmitRequest: {
            /**
             * Metric Type
             * @description e.g. steps, distance, run, 7min_workout, calories, manual
             */
            metric_type: string;
            /** Value */
            value: number | string;
            /**
             * Unit
             * @description e.g. km, reps, mins — steps has no unit
             */
            unit?: string | null;
            /**
             * Source
             * @default manual
             */
            source: string;
        };
        /** ActivitySubmitResponse */
        ActivitySubmitResponse: {
            entry: components["schemas"]["ActivityLogResponse"];
            /**
             * Challenges Updated
             * @description IDs of active challenges this submission also fed progress into.
             */
            challenges_updated?: string[];
        };
        /**
         * ActivitySummaryResponse
         * @description Aggregate counts only — never the underlying raw entries. Safe to
         *     expose broadly (org-wide or branch-wide) since no individual's
         *     specific actions are identifiable from a total.
         */
        ActivitySummaryResponse: {
            /** Total Count */
            total_count: number;
            /** By Type */
            by_type: components["schemas"]["ActivityTypeCount"][];
            trend?: components["schemas"]["ActivityTrend"] | null;
        };
        /** ActivityTrend */
        ActivityTrend: {
            /** Current */
            current: number;
            /** Previous */
            previous: number | null;
            /** Change Pct */
            change_pct: number | null;
        };
        /** ActivityTrendPoint */
        ActivityTrendPoint: {
            /**
             * Period
             * Format: date
             */
            period: string;
            /** Value */
            value: string;
        };
        /** ActivityTrendResponse */
        ActivityTrendResponse: {
            /** Metric Type */
            metric_type: string;
            /** Granularity */
            granularity: string;
            /** Points */
            points: components["schemas"]["ActivityTrendPoint"][];
        };
        /** ActivityTypeCount */
        ActivityTypeCount: {
            /** Activity Type */
            activity_type: string;
            /** Count */
            count: number;
        };
        /** AssessmentListResponse */
        AssessmentListResponse: {
            /** Items */
            items: components["schemas"]["AssessmentResponse"][];
        };
        /** AssessmentResponse */
        AssessmentResponse: {
            /** Id */
            id: string;
            /** Category Id */
            category_id: string | null;
            /** Risk Score */
            risk_score: string | null;
            /** Status */
            status: string;
            /** Assessed At */
            assessed_at: string | null;
        };
        /** AssessmentSubmitRequest */
        AssessmentSubmitRequest: {
            /** Category Id */
            category_id?: string | null;
            /** Risk Score */
            risk_score?: number | string | null;
            /**
             * Status
             * @description pending | completed | reviewed
             * @default pending
             */
            status: string;
        };
        /** AutoRenewUpdateRequest */
        AutoRenewUpdateRequest: {
            /** Enabled */
            enabled: boolean;
        };
        /** AvatarUpdateRequest */
        AvatarUpdateRequest: {
            /** Media Url */
            media_url: string;
        };
        /** AvatarUpdateResponse */
        AvatarUpdateResponse: {
            /** Avatar Url */
            avatar_url: string;
        };
        /**
         * BaselineDimensionSchema
         * @description One UserWellbeingBaseline row.
         */
        BaselineDimensionSchema: {
            /**
             * Dimension
             * @enum {string}
             */
            dimension: "mood" | "energy" | "stress" | "work_life_balance";
            /**
             * Level
             * @enum {string}
             */
            level: "amazed" | "stressed" | "tired" | "excited" | "infuriated";
            /**
             * Reason
             * @enum {string}
             */
            reason: "work" | "family" | "breakup" | "sleep" | "social" | "food" | "love" | "exams" | "others";
        };
        /** BaselineListResponse */
        BaselineListResponse: {
            /** Items */
            items: components["schemas"]["BaselineResponse"][];
        };
        /** BaselineResponse */
        BaselineResponse: {
            /** Id */
            id: string;
            /** Dimension */
            dimension: string;
            /** Level */
            level: string;
            /** Reason */
            reason: string | null;
            /**
             * Recorded At
             * Format: date-time
             */
            recorded_at: string;
        };
        /** BaselineSubmitRequest */
        BaselineSubmitRequest: {
            /**
             * Dimension
             * @description mood | stress | energy | work_life_balance
             */
            dimension: string;
            /**
             * Level
             * @description good | bad | stressed | tired
             */
            level: string;
            /** Reason */
            reason?: string | null;
        };
        /** BranchCreateRequest */
        BranchCreateRequest: {
            /** Name */
            name: string;
        };
        /** BranchListResponse */
        BranchListResponse: {
            /** Items */
            items: components["schemas"]["BranchResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** BranchManagerAssignRequest */
        BranchManagerAssignRequest: {
            /** Manager Id */
            manager_id: string;
        };
        /** BranchManagerResponse */
        BranchManagerResponse: {
            /** Branch Id */
            branch_id: string;
            /** Organization Id */
            organization_id: string;
            /** Manager Id */
            manager_id: string | null;
            /** Message */
            message: string;
        };
        /** BranchMemberAssignRequest */
        BranchMemberAssignRequest: {
            /**
             * Department Id
             * @description Department in the destination branch the user will be placed into.
             */
            department_id: string;
        };
        /** BranchMemberAssignResponse */
        BranchMemberAssignResponse: {
            /** User Id */
            user_id: string;
            /** Branch Id */
            branch_id: string;
            /** Organization Id */
            organization_id: string;
            /** Message */
            message: string;
        };
        /**
         * BranchMemberInfo
         * @description Allow-list — deliberately excludes hashed_password and other
         *     sensitive User fields. Add fields only as the client actually needs.
         */
        BranchMemberInfo: {
            /** Id */
            id: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Email */
            email: string;
            /** Avatar Url */
            avatar_url: string | null;
            /** Status */
            status: string;
        };
        /** BranchMembersListResponse */
        BranchMembersListResponse: {
            /** Items */
            items: components["schemas"]["BranchMemberInfo"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** BranchResponse */
        BranchResponse: {
            /** Id */
            id: string;
            /** Organization Id */
            organization_id: string;
            /** Name */
            name: string;
            /** Manager Id */
            manager_id: string | null;
            /** Created By */
            created_by: string | null;
        };
        /** BranchStatsResponse */
        BranchStatsResponse: {
            /** Total Users */
            total_users: number;
            users_trend: components["schemas"]["app__schemas__organization__TrendData"];
            /** Total Departments */
            total_departments: number;
            departments_trend: components["schemas"]["app__schemas__organization__TrendData"];
            /** Total Clubs */
            total_clubs: number;
            clubs_trend: components["schemas"]["app__schemas__organization__TrendData"];
            /** Total Events */
            total_events: number;
            events_trend: components["schemas"]["app__schemas__organization__TrendData"];
            /** Total Challenges */
            total_challenges: number;
            challenges_trend: components["schemas"]["app__schemas__organization__TrendData"];
        };
        /** BranchUpdateRequest */
        BranchUpdateRequest: {
            /** Name */
            name?: string | null;
        };
        /** CategoryListResponse */
        CategoryListResponse: {
            /** Items */
            items: components["schemas"]["CategoryResponse"][];
        };
        /** CategoryResponse */
        CategoryResponse: {
            /** Id */
            id: string;
            /** Name */
            name: string;
            /** Badge Color */
            badge_color: string | null;
        };
        /** ChallengeCreateRequest */
        ChallengeCreateRequest: {
            /**
             * Branch Id
             * @description Null = org-level challenge.
             */
            branch_id?: string | null;
            /** Wellbeing Challenge Id */
            wellbeing_challenge_id?: string | null;
            /** Name */
            name: string;
            /** Description */
            description?: string | null;
            /** Image Url */
            image_url?: string | null;
            /**
             * Start Date
             * Format: date
             */
            start_date: string;
            /**
             * End Date
             * Format: date
             */
            end_date: string;
            /** Metric Type */
            metric_type?: string | null;
            /**
             * Target Type
             * @description 'cumulative' or 'daily_minimum'
             * @default cumulative
             */
            target_type: string;
            /** Target Value */
            target_value?: number | string | null;
        };
        /** ChallengeListResponse */
        ChallengeListResponse: {
            /** Items */
            items: components["schemas"]["ChallengeResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** ChallengeResponse */
        ChallengeResponse: {
            /** Id */
            id: string;
            /** Organization Id */
            organization_id: string;
            /** Branch Id */
            branch_id: string | null;
            /** Wellbeing Challenge Id */
            wellbeing_challenge_id: string | null;
            /** Name */
            name: string;
            /** Description */
            description: string | null;
            /** Image Url */
            image_url: string | null;
            /** Start Date */
            start_date: string | null;
            /** End Date */
            end_date: string | null;
            /** Status */
            status: string;
            /** Metric Type */
            metric_type: string | null;
            /** Target Type */
            target_type: string;
            /** Target Value */
            target_value: number | null;
            /** Created By */
            created_by: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Participant Count
             * @default 0
             */
            participant_count: number;
            /** Completion Rate */
            completion_rate?: number | null;
        };
        /** ChallengeStatsResponse */
        ChallengeStatsResponse: {
            /** Active Challenges */
            active_challenges: number;
            active_challenges_trend: components["schemas"]["app__schemas__challenge__TrendData"] | null;
            /** Total Participants */
            total_participants: number;
            total_participants_trend: components["schemas"]["app__schemas__challenge__TrendData"] | null;
            /** Completion Rate */
            completion_rate: number;
            completion_rate_trend: components["schemas"]["app__schemas__challenge__TrendData"] | null;
        };
        /** ChallengeUpdateRequest */
        ChallengeUpdateRequest: {
            /** Name */
            name?: string | null;
            /** Description */
            description?: string | null;
            /** Image Url */
            image_url?: string | null;
            /** Start Date */
            start_date?: string | null;
            /** End Date */
            end_date?: string | null;
            /** Metric Type */
            metric_type?: string | null;
            /** Target Type */
            target_type?: string | null;
            /** Target Value */
            target_value?: number | string | null;
            /** Status */
            status?: string | null;
        };
        /** ChangePasswordRequest */
        ChangePasswordRequest: {
            /** Current Password */
            current_password: string;
            /** New Password */
            new_password: string;
        };
        /** CheckinListResponse */
        CheckinListResponse: {
            /** Items */
            items: components["schemas"]["CheckinResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** CheckinResponse */
        CheckinResponse: {
            /** Id */
            id: string;
            /** Mood */
            mood: string;
            /** Energy Level */
            energy_level: string;
            /** Stress Level */
            stress_level: string;
            /** Notes */
            notes: string | null;
            /**
             * Checked In At
             * Format: date-time
             */
            checked_in_at: string;
            /**
             * Checkin Date
             * Format: date
             */
            checkin_date: string;
        };
        /** CheckinStreakResponse */
        CheckinStreakResponse: {
            /** Current Streak Days */
            current_streak_days: number;
            /** Checked In Today */
            checked_in_today: boolean;
        };
        /** CheckinSubmitRequest */
        CheckinSubmitRequest: {
            /**
             * Mood
             * @description good | bad | stressed | tired
             */
            mood: string;
            /**
             * Energy Level
             * @description good | bad | stressed | tired
             */
            energy_level: string;
            /**
             * Stress Level
             * @description good | bad | stressed | tired
             */
            stress_level: string;
            /** Notes */
            notes?: string | null;
        };
        /** CheckoutRequest */
        CheckoutRequest: {
            /**
             * Plan Id
             * @description The plan to check out into — e.g. the id of the 'Standard' plan.
             */
            plan_id: string;
            /** Callback Url */
            callback_url?: string | null;
            /**
             * Auto Renew
             * @description If true, saves the payment method and auto-charges every renewal period. If false, this is a one-time charge only — no future charges without the customer explicitly initiating checkout again.
             * @default false
             */
            auto_renew: boolean;
        };
        /** CheckoutResponse */
        CheckoutResponse: {
            /** Authorization Url */
            authorization_url: string;
            /** Reference */
            reference: string;
            /** Access Code */
            access_code: string | null;
        };
        /** ClubCreateRequest */
        ClubCreateRequest: {
            /** Name */
            name: string;
            /** Description */
            description?: string | null;
            /** Image Url */
            image_url?: string | null;
            /**
             * Privacy
             * @default public
             */
            privacy: string;
            /** Category */
            category: string;
        };
        /** ClubDeleteResponse */
        ClubDeleteResponse: {
            /** Club Id */
            club_id: string;
            /** Organization Id */
            organization_id: string;
            /** Message */
            message: string;
        };
        /** ClubJoinResponse */
        ClubJoinResponse: {
            /** User Id */
            user_id: string;
            /** Club Id */
            club_id: string;
            /** Organization Id */
            organization_id: string;
            /** Message */
            message: string;
            /**
             * Is Member
             * @default false
             */
            is_member: boolean;
        };
        /** ClubLeaveResponse */
        ClubLeaveResponse: {
            /** User Id */
            user_id: string;
            /** Club Id */
            club_id: string;
            /** Organization Id */
            organization_id: string;
            /** Message */
            message: string;
        };
        /** ClubListResponse */
        ClubListResponse: {
            /** Items */
            items: components["schemas"]["ClubResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** ClubMemberInfo */
        ClubMemberInfo: {
            /** Id */
            id: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Email */
            email: string;
            /** Avatar Url */
            avatar_url: string | null;
            /** Status */
            status: string;
        };
        /** ClubMembersListResponse */
        ClubMembersListResponse: {
            /** Items */
            items: components["schemas"]["ClubMemberInfo"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /**
         * ClubRemoveMemberResponse
         * @description Returned when the club leader removes a member.
         */
        ClubRemoveMemberResponse: {
            /** User Id */
            user_id: string;
            /** Club Id */
            club_id: string;
            /** Organization Id */
            organization_id: string;
            /** Message */
            message: string;
        };
        /** ClubResponse */
        ClubResponse: {
            /** Id */
            id: string;
            /** Name */
            name: string;
            /** Description */
            description: string | null;
            /** Image Url */
            image_url: string | null;
            /** Privacy */
            privacy: string;
            /** Organization Id */
            organization_id: string;
            /** Branch Id */
            branch_id: string;
            /** Category */
            category: string;
            /** Member Count */
            member_count: number;
            /** Created By */
            created_by: string | null;
            /** Leader Id */
            leader_id: string | null;
            /**
             * Is Member
             * @default false
             */
            is_member: boolean;
        };
        /**
         * ClubUpdateRequest
         * @description All fields optional — PATCH semantics.
         */
        ClubUpdateRequest: {
            /** Name */
            name?: string | null;
            /** Description */
            description?: string | null;
            /** Image Url */
            image_url?: string | null;
            /** Privacy */
            privacy?: string | null;
            /** Category */
            category?: string | null;
        };
        /** CommentCreateRequest */
        CommentCreateRequest: {
            /** Content */
            content: string;
            /**
             * Parent Comment Id
             * @description Set to reply to another comment.
             */
            parent_comment_id?: string | null;
        };
        /** CommentListResponse */
        CommentListResponse: {
            /** Items */
            items: components["schemas"]["CommentResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /**
         * CommentReplyResponse
         * @description A reply — one level deep, no further nested replies (by design,
         *     see comment_service.get_comments).
         */
        CommentReplyResponse: {
            /** Id */
            id: string;
            /** Post Id */
            post_id: string;
            /** User Id */
            user_id: string;
            /** Content */
            content: string | null;
            /** Parent Comment Id */
            parent_comment_id: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at: string;
        };
        /** CommentResponse */
        CommentResponse: {
            /** Id */
            id: string;
            /** Post Id */
            post_id: string;
            /** User Id */
            user_id: string;
            /** Content */
            content: string | null;
            /** Parent Comment Id */
            parent_comment_id: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at: string;
            /**
             * Replies
             * @default []
             */
            replies: components["schemas"]["CommentReplyResponse"][];
        };
        /** CommentUpdateRequest */
        CommentUpdateRequest: {
            /** Content */
            content: string;
        };
        /** DailyProgressEntry */
        DailyProgressEntry: {
            /**
             * Entry Date
             * Format: date
             */
            entry_date: string;
            /** Value */
            value: string;
            /** Met Target */
            met_target: boolean | null;
        };
        /** DashboardBootstrapResponse */
        DashboardBootstrapResponse: {
            user: components["schemas"]["UserMeResponse"];
            /** Branches */
            branches: components["schemas"]["BranchResponse"][];
            /** Members */
            members: components["schemas"]["OrganizationMemberInfo"][];
            /** Departments */
            departments: components["schemas"]["DepartmentBootstrapItem"][];
            /** Events */
            events: components["schemas"]["EventResponse"][];
            /** Challenges */
            challenges: components["schemas"]["ChallengeResponse"][];
            /** Leaderboard */
            leaderboard: components["schemas"]["LeaderboardEntryResponse"][];
        };
        /** DepartmentBootstrapItem */
        DepartmentBootstrapItem: {
            /** Id */
            id: string;
            /** Name */
            name: string;
            /** Members */
            members: number;
            /** Activities */
            activities: number | null;
            /** Rank */
            rank: number | null;
            /** Branch */
            branch: string | null;
            /** Avatars */
            avatars: string[];
        };
        /** DepartmentCreateRequest */
        DepartmentCreateRequest: {
            /** Name */
            name: string;
            /** Description */
            description?: string | null;
            /** Avatar Initial */
            avatar_initial?: string | null;
            /** Branch Id */
            branch_id: string;
        };
        /** DepartmentDeleteRequest */
        DepartmentDeleteRequest: {
            /**
             * Transfer To Department Id
             * @description Required if the department has members. All members are moved here before deletion.
             */
            transfer_to_department_id?: string | null;
        };
        /** DepartmentDeleteResponse */
        DepartmentDeleteResponse: {
            /** Department Id */
            department_id: string;
            /** Organization Id */
            organization_id: string;
            /** Members Transferred */
            members_transferred: number;
            /** Message */
            message: string;
        };
        /** DepartmentHeadAssignResponse */
        DepartmentHeadAssignResponse: {
            /** Department Id */
            department_id: string;
            /** Organization Id */
            organization_id: string;
            /** Head User Id */
            head_user_id: string;
            /** Message */
            message: string;
        };
        /** DepartmentHeadRemoveResponse */
        DepartmentHeadRemoveResponse: {
            /** Department Id */
            department_id: string;
            /** Organization Id */
            organization_id: string;
            /** Message */
            message: string;
        };
        /** DepartmentListResponse */
        DepartmentListResponse: {
            /** Items */
            items: components["schemas"]["DepartmentResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** DepartmentMemberAssignResponse */
        DepartmentMemberAssignResponse: {
            /** User Id */
            user_id: string;
            /** Department Id */
            department_id: string;
            /** Organization Id */
            organization_id: string;
            /** Message */
            message: string;
        };
        /** DepartmentMemberInfo */
        DepartmentMemberInfo: {
            /** Id */
            id: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Email */
            email: string;
            /** Avatar Url */
            avatar_url: string | null;
            /** Status */
            status: string;
        };
        /** DepartmentMembersListResponse */
        DepartmentMembersListResponse: {
            /** Items */
            items: components["schemas"]["DepartmentMemberInfo"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** DepartmentRankListResponse */
        DepartmentRankListResponse: {
            /** Items */
            items: components["schemas"]["DepartmentRankResponse"][];
        };
        /** DepartmentRankResponse */
        DepartmentRankResponse: {
            /** Department Id */
            department_id: string;
            /** Department Name */
            department_name: string;
            /** Branch Id */
            branch_id: string;
            /** Rank */
            rank: number | null;
            /** Total Activities */
            total_activities: number | null;
            /** Avg Daily Steps */
            avg_daily_steps: string | null;
            /** Performance Score */
            performance_score: string | null;
            /** Period Start */
            period_start: string | null;
            /** Period End */
            period_end: string | null;
        };
        /** DepartmentResponse */
        DepartmentResponse: {
            /** Id */
            id: string;
            /** Name */
            name: string;
            /** Description */
            description: string | null;
            /** Avatar Initial */
            avatar_initial: string | null;
            /** Organization Id */
            organization_id: string;
            /** Branch Id */
            branch_id: string;
            /** Created By */
            created_by: string;
            /** Member Count */
            member_count: number;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at: string;
        };
        /**
         * DepartmentUpdateRequest
         * @description All fields optional — only provided fields are updated (PATCH semantics).
         */
        DepartmentUpdateRequest: {
            /** Name */
            name?: string | null;
            /** Description */
            description?: string | null;
            /** Avatar Initial */
            avatar_initial?: string | null;
        };
        /** EngagementSnapshotResponse */
        EngagementSnapshotResponse: {
            /** Date */
            date: string | null;
            /** Checkins */
            checkins: string | null;
            /** Checkins Trend */
            checkins_trend: string | null;
            /** Participation */
            participation: string | null;
            /** Participation Trend */
            participation_trend: string | null;
            /** Social */
            social: string | null;
            /** Social Trend */
            social_trend: string | null;
            /** Productivity */
            productivity: string | null;
            /** Productivity Trend */
            productivity_trend: string | null;
        };
        /** EngagementTrendPoint */
        EngagementTrendPoint: {
            /**
             * Date
             * Format: date
             */
            date: string;
            /** Value */
            value: string;
            /** Previous Value */
            previous_value: string | null;
            /** Trend Direction */
            trend_direction: string | null;
        };
        /** EngagementTrendResponse */
        EngagementTrendResponse: {
            /** Metric Type */
            metric_type: string;
            /** Points */
            points: components["schemas"]["EngagementTrendPoint"][];
        };
        /** EngagementWellbeingTrendPoint */
        EngagementWellbeingTrendPoint: {
            /**
             * Date
             * Format: date
             */
            date: string;
            /** Stress Level */
            stress_level: number | null;
            /** Energy Level */
            energy_level: number | null;
            /** Social Interaction */
            social_interaction: number | null;
            /** Productivity */
            productivity: number | null;
        };
        /** EngagementWellbeingTrendsResponse */
        EngagementWellbeingTrendsResponse: {
            /**
             * Period
             * @enum {string}
             */
            period: "week" | "month" | "three_months";
            /**
             * Start Date
             * Format: date
             */
            start_date: string;
            /**
             * End Date
             * Format: date
             */
            end_date: string;
            /** Points */
            points: components["schemas"]["EngagementWellbeingTrendPoint"][];
        };
        /** EventCreateRequest */
        EventCreateRequest: {
            /**
             * Branch Id
             * @description Required — every event must belong to a branch.
             */
            branch_id: string;
            /** Title */
            title: string;
            /** Description */
            description?: string | null;
            /** Image Url */
            image_url?: string | null;
            /**
             * Start Date
             * Format: date
             */
            start_date: string;
            /** End Date */
            end_date?: string | null;
            /** Recurrence Rule */
            recurrence_rule?: string | null;
            /**
             * Time
             * Format: time
             */
            time: string;
        };
        /** EventListResponse */
        EventListResponse: {
            /** Items */
            items: components["schemas"]["EventResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /**
         * EventParticipantInfo
         * @description Allow-list of participant + user fields — no sensitive User columns.
         */
        EventParticipantInfo: {
            /** User Id */
            user_id: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Email */
            email: string;
            /** Status */
            status: string | null;
            /** Attended */
            attended: boolean;
            /** Invited At */
            invited_at: string | null;
        };
        /** EventParticipantsListResponse */
        EventParticipantsListResponse: {
            /** Items */
            items: components["schemas"]["EventParticipantInfo"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** EventResponse */
        EventResponse: {
            /** Id */
            id: string;
            /** Title */
            title: string;
            /** Description */
            description: string | null;
            /** Image Url */
            image_url: string | null;
            /**
             * Start Date
             * Format: date
             */
            start_date: string;
            /** End Date */
            end_date: string | null;
            /** Recurrence Rule */
            recurrence_rule: string | null;
            /**
             * Time
             * Format: time
             */
            time: string;
            /** Status */
            status: string;
            /** Organization Id */
            organization_id: string;
            /** Branch Id */
            branch_id: string;
            /** Created By */
            created_by: string | null;
            /**
             * Participant Count
             * @default 0
             */
            participant_count: number;
        };
        /** EventUpdateRequest */
        EventUpdateRequest: {
            /** Title */
            title?: string | null;
            /** Description */
            description?: string | null;
            /** Image Url */
            image_url?: string | null;
            /** Start Date */
            start_date?: string | null;
            /** End Date */
            end_date?: string | null;
            /** Recurrence Rule */
            recurrence_rule?: string | null;
            /** Time */
            time?: string | null;
            /** Status */
            status?: string | null;
        };
        /** ForgotPasswordRequest */
        ForgotPasswordRequest: {
            /**
             * Email
             * Format: email
             */
            email: string;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** HashtagListResponse */
        HashtagListResponse: {
            /** Items */
            items: components["schemas"]["HashtagResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** HashtagResponse */
        HashtagResponse: {
            /** Id */
            id: string;
            /** Tag Name */
            tag_name: string;
            /** Total Post Count */
            total_post_count: number;
        };
        /** HealthCategoryListResponse */
        HealthCategoryListResponse: {
            /** Items */
            items: components["schemas"]["HealthCategoryResponse"][];
        };
        /** HealthCategoryResponse */
        HealthCategoryResponse: {
            /** Id */
            id: string;
            /** Name */
            name: string;
        };
        /** IntegrationItem */
        IntegrationItem: {
            /** Id */
            id: string;
            /** Name */
            name: string;
            /** Description */
            description: string;
            /** Status */
            status: string;
            /** Enabled */
            enabled: boolean;
        };
        /** IntegrationListResponse */
        IntegrationListResponse: {
            /** Items */
            items: components["schemas"]["IntegrationItem"][];
        };
        /** InviteItem */
        InviteItem: {
            /** Invite Id */
            invite_id: string;
            /** Invited Email */
            invited_email: string;
            /** Organization Id */
            organization_id: string;
            /** Branch Id */
            branch_id: string | null;
            /** Invited Department Id */
            invited_department_id: string;
            /** Invited Role Id */
            invited_role_id: string;
            /** Invited By */
            invited_by: string;
            /** Status */
            status: string;
            /** Expires At */
            expires_at: string;
            /** Created At */
            created_at: string;
        };
        /** InviteListResponse */
        InviteListResponse: {
            /** Items */
            items: components["schemas"]["InviteItem"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** InviteOtpRequestSchema */
        InviteOtpRequestSchema: {
            /** Invite Code */
            invite_code: string;
        };
        /** InviteOtpVerifySchema */
        InviteOtpVerifySchema: {
            /** Invite Code */
            invite_code: string;
            /** Code */
            code: string;
        };
        /** InviteRegisterRequest */
        InviteRegisterRequest: {
            /** Invite Verification Token */
            invite_verification_token: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Password */
            password: string;
            /** Country */
            country: string;
            /** State */
            state: string;
            baseline: components["schemas"]["WellbeingBaselineSchema"];
            /** Priorities */
            priorities: components["schemas"]["PriorityItemSchema"][];
        };
        /** InviteRegistrationResponse */
        InviteRegistrationResponse: {
            /** Message */
            message: string;
            /** Role */
            role: string;
            /** Requires App */
            requires_app: boolean;
            /** Access Token */
            access_token?: string | null;
            /** Refresh Token */
            refresh_token?: string | null;
            /** Token Type */
            token_type?: string | null;
        };
        /** KPIChartPoint */
        KPIChartPoint: {
            /** Name */
            name: string;
            /** Actual */
            actual?: number | null;
            /** Target */
            target?: number | null;
            /** Steps */
            steps?: number | null;
        };
        /** KPIDepartment */
        KPIDepartment: {
            /** Name */
            name: string;
            /** Branch Name */
            branch_name?: string | null;
            /** Engagement */
            engagement: number;
        };
        /** KPIDistribution */
        KPIDistribution: {
            /** Name */
            name: string;
            /** Value */
            value: number;
            /** Color */
            color: string;
        };
        /** KPIOverviewResponse */
        KPIOverviewResponse: {
            /** Period */
            period: string;
            /** Scope */
            scope: string;
            /** Branch Id */
            branch_id?: string | null;
            summary: components["schemas"]["KPIOverviewSummary"];
            /** Monthly Steps */
            monthly_steps?: components["schemas"]["KPIChartPoint"][];
            /** Health Distribution */
            health_distribution?: components["schemas"]["KPIDistribution"][];
            /** Department Performance */
            department_performance?: components["schemas"]["KPIDepartment"][];
            /** Weekly Activity */
            weekly_activity?: components["schemas"]["KPIChartPoint"][];
            /** Top Performers */
            top_performers?: components["schemas"]["KPIPerformer"][];
        };
        /** KPIOverviewSummary */
        KPIOverviewSummary: {
            average_daily_steps: components["schemas"]["KPITrend"];
            health_score: components["schemas"]["KPITrend"];
            active_employees: components["schemas"]["KPITrend"];
            challenges_won: components["schemas"]["KPITrend"];
        };
        /** KPIPerformer */
        KPIPerformer: {
            /** User Id */
            user_id: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Avatar Url */
            avatar_url?: string | null;
            /** Steps */
            steps: number;
            /** Score */
            score: number;
            /** Rank */
            rank: number;
        };
        /** KPISnapshotListResponse */
        KPISnapshotListResponse: {
            /** Items */
            items: components["schemas"]["KPISnapshotResponse"][];
        };
        /** KPISnapshotResponse */
        KPISnapshotResponse: {
            /** Id */
            id: string;
            /** Branch Id */
            branch_id: string;
            /** Metric Name */
            metric_name: string;
            /**
             * Period Start
             * Format: date
             */
            period_start: string;
            /**
             * Period End
             * Format: date
             */
            period_end: string;
            /** Value */
            value: string;
        };
        /** KPITrend */
        KPITrend: {
            /** Value */
            value?: number | null;
            /** Change */
            change?: number | null;
        };
        /** LeaderboardEntryResponse */
        LeaderboardEntryResponse: {
            /** User Id */
            user_id: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Avatar Url */
            avatar_url?: string | null;
            /** Value */
            value: string;
            /** Rank */
            rank: number;
            /** Previous Rank */
            previous_rank: number | null;
            /** Org Rank */
            org_rank: number;
            /** Previous Org Rank */
            previous_org_rank: number | null;
        };
        /** LeaderboardResponse */
        LeaderboardResponse: {
            /** Metric Type */
            metric_type: string;
            /** Period Type */
            period_type: string;
            /**
             * Period Start
             * Format: date
             */
            period_start: string;
            /**
             * Period End
             * Format: date
             */
            period_end: string;
            /** Scope */
            scope: string;
            /** Items */
            items: components["schemas"]["LeaderboardEntryResponse"][];
        };
        /** LikeActionResponse */
        LikeActionResponse: {
            /** Post Id */
            post_id: string;
            /** User Id */
            user_id: string;
            /** Liked */
            liked: boolean;
            /** Like Count */
            like_count: number;
            /** Message */
            message: string;
        };
        /**
         * LikesGivenCountResponse
         * @description Count of posts the current user has liked, optionally restricted
         *     to a period_start/period_end window. See /posts/likes/given/count.
         */
        LikesGivenCountResponse: {
            /** Count */
            count: number;
        };
        /** LivePulseResponse */
        LivePulseResponse: {
            /** Window Id */
            window_id: string;
            /** Respondent Count */
            respondent_count: number;
            stress_manageability: components["schemas"]["PulseQuestionResult"];
            energy_recovery: components["schemas"]["PulseQuestionResult"];
            connection_belonging: components["schemas"]["PulseQuestionResult"];
            workload_sustainability: components["schemas"]["PulseQuestionResult"];
            workplace_comfort: components["schemas"]["PulseQuestionResult"];
            /** Priority Support Pct */
            priority_support_pct: string | null;
            /** Needs Attention Pct */
            needs_attention_pct: string | null;
            /** Doing Well Pct */
            doing_well_pct: string | null;
        };
        /** LoginRequest */
        LoginRequest: {
            /**
             * Email
             * Format: email
             */
            email: string;
            /** Password */
            password: string;
        };
        /** MarkAllReadResponse */
        MarkAllReadResponse: {
            /** Marked Count */
            marked_count: number;
            /** Message */
            message: string;
        };
        /** MarkReadResponse */
        MarkReadResponse: {
            /** Notification Id */
            notification_id: string;
            /** Is Read */
            is_read: boolean;
            /** Message */
            message: string;
        };
        /** MemberRoleUpdateRequest */
        MemberRoleUpdateRequest: {
            /** Role Id */
            role_id: string | null;
        };
        /** MessageCreateRequest */
        MessageCreateRequest: {
            /** Content */
            content?: string | null;
            /** Media Url */
            media_url?: string | null;
            /** Media Type */
            media_type?: string | null;
        };
        /** MessageDeleteResponse */
        MessageDeleteResponse: {
            /** Message Id */
            message_id: string;
            /** Message */
            message: string;
        };
        /** MessageListResponse */
        MessageListResponse: {
            /** Items */
            items: components["schemas"]["MessageResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** MessageResponse */
        MessageResponse: {
            /** Id */
            id: string;
            /** Organization Id */
            organization_id: string;
            /** Conversation Type */
            conversation_type: string;
            /** Conversation Id */
            conversation_id: string;
            /** User Id */
            user_id: string;
            /** Content */
            content: string | null;
            /** Media Url */
            media_url: string | null;
            /** Media Type */
            media_type: string | null;
            /** Is Pinned */
            is_pinned: boolean;
            /** Pinned By */
            pinned_by: string | null;
            /** Pinned At */
            pinned_at: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
        };
        /** MyResponseItem */
        MyResponseItem: {
            /** Window Id */
            window_id: string;
            /** Question Key */
            question_key: string;
            /** Response Value */
            response_value: number;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
        };
        /** MyResponseListResponse */
        MyResponseListResponse: {
            /** Items */
            items: components["schemas"]["MyResponseItem"][];
        };
        /** NotificationListResponse */
        NotificationListResponse: {
            /** Items */
            items: components["schemas"]["NotificationResponse"][];
            /** Total */
            total: number;
            /** Unread Count */
            unread_count: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** NotificationResponse */
        NotificationResponse: {
            /** Id */
            id: string;
            /** Organization Id */
            organization_id: string | null;
            /** Actor Id */
            actor_id: string | null;
            /** Notification Type */
            notification_type: string;
            /** Reference Id */
            reference_id: string | null;
            /** Reference Type */
            reference_type: string | null;
            /** Body */
            body: string;
            /** Image Url */
            image_url: string | null;
            /** Is Read */
            is_read: boolean;
            /** Read At */
            read_at: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
        };
        /**
         * OAuthRequest
         * @description Frontend-first OAuth flow (Google or Apple).
         *
         *     Google: name + avatar come from the verified ID token claims.
         *             first_name / last_name here are IGNORED for Google.
         *     Apple:  the ID token only carries sub + email. Apple sends the
         *             user's name exactly ONCE — in the native
         *             ASAuthorizationAppleIDCredential object on first login.
         *             The frontend MUST capture first_name / last_name at that
         *             moment and forward them here. On subsequent logins these
         *             may be omitted (user row already exists).
         */
        OAuthRequest: {
            /** Id Token */
            id_token: string;
            /** Invite Code */
            invite_code?: string | null;
            /** First Name */
            first_name?: string | null;
            /** Last Name */
            last_name?: string | null;
        };
        /**
         * OpenWindowResponse
         * @description What a member sees when checking if there's a survey to answer.
         */
        OpenWindowResponse: {
            /** Window Id */
            window_id: string;
            /**
             * Window Start
             * Format: date
             */
            window_start: string;
            /**
             * Window End
             * Format: date
             */
            window_end: string;
            /** Already Responded */
            already_responded: boolean;
            /** Questions */
            questions: components["schemas"]["SurveyQuestionInfo"][];
        };
        /** OrgChallengeOptInListResponse */
        OrgChallengeOptInListResponse: {
            /** Items */
            items: components["schemas"]["OrgChallengeOptInResponse"][];
        };
        /** OrgChallengeOptInRequest */
        OrgChallengeOptInRequest: {
            /** Wellbeing Challenge Id */
            wellbeing_challenge_id: string;
        };
        /** OrgChallengeOptInResponse */
        OrgChallengeOptInResponse: {
            /** Id */
            id: string;
            /** Wellbeing Challenge Id */
            wellbeing_challenge_id: string;
        };
        /**
         * OrgOwnerRegisterRequest
         * @description Step 3 — self-serve org-owner signup.
         *
         *     email_verification_token comes from /auth/signup/otp/verify and
         *     proves the email was OTP-verified. The email itself is recovered
         *     server-side from the token — it is NOT re-supplied here, preventing
         *     substitution attacks.
         */
        OrgOwnerRegisterRequest: {
            /** Email Verification Token */
            email_verification_token: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Password */
            password: string;
            /** Business Name */
            business_name: string;
            /** Phone Number */
            phone_number: string;
            /** Employee Count */
            employee_count: number;
            /** Organization Type */
            organization_type: string;
            /** Work Model */
            work_model: string;
        };
        /** OrgStatsResponse */
        OrgStatsResponse: {
            /** Total Users */
            total_users: number;
            users_trend: components["schemas"]["app__schemas__organization__TrendData"];
            /** Total Branches */
            total_branches: number;
            branches_trend: components["schemas"]["app__schemas__organization__TrendData"];
            /** Total Departments */
            total_departments: number;
            departments_trend: components["schemas"]["app__schemas__organization__TrendData"];
            /** Total Clubs */
            total_clubs: number;
            clubs_trend: components["schemas"]["app__schemas__organization__TrendData"];
            /** Total Events */
            total_events: number;
            events_trend: components["schemas"]["app__schemas__organization__TrendData"];
            /** Total Challenges */
            total_challenges: number;
            challenges_trend: components["schemas"]["app__schemas__organization__TrendData"];
            /** Active Challenges */
            active_challenges: number;
            /** Total Posts */
            total_posts: number;
            posts_trend: components["schemas"]["app__schemas__organization__TrendData"];
        };
        /**
         * OrgWideKPIPoint
         * @description One derived org-wide data point — SUM(value) across every branch
         *     that has a snapshot for this date. Not stored — see KPISnapshot's
         *     model docstring.
         */
        OrgWideKPIPoint: {
            /**
             * Period Start
             * Format: date
             */
            period_start: string;
            /**
             * Period End
             * Format: date
             */
            period_end: string;
            /** Value */
            value: string;
            /**
             * Branch Count
             * @description How many branches contributed to this total.
             */
            branch_count: number;
        };
        /** OrgWideKPIResponse */
        OrgWideKPIResponse: {
            /** Organization Id */
            organization_id: string;
            /** Metric Name */
            metric_name: string;
            /** Points */
            points: components["schemas"]["OrgWideKPIPoint"][];
        };
        /** OrganizationClubInfo */
        OrganizationClubInfo: {
            /** Id */
            id: string;
            /** Name */
            name: string;
            /** Description */
            description: string | null;
            /** Privacy */
            privacy: string;
            /** Category */
            category: string;
            /** Branch Id */
            branch_id: string | null;
            /** Member Count */
            member_count: number;
        };
        /** OrganizationClubsListResponse */
        OrganizationClubsListResponse: {
            /** Items */
            items: components["schemas"]["OrganizationClubInfo"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /**
         * OrganizationMemberInfo
         * @description Allow-list — deliberately excludes hashed_password and other
         *     sensitive User fields. Add fields only as the client actually needs.
         */
        OrganizationMemberInfo: {
            /** Id */
            id: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Email */
            email: string;
            /** Avatar Url */
            avatar_url: string | null;
            /** Status */
            status: string;
            /** Role Id */
            role_id: string | null;
            /** Branch Id */
            branch_id: string | null;
            /** Department Id */
            department_id?: string | null;
            /** Role Name */
            role_name?: string | null;
            /**
             * Public Profile
             * @default false
             */
            public_profile: boolean;
        };
        /** OrganizationMembersListResponse */
        OrganizationMembersListResponse: {
            /** Items */
            items: components["schemas"]["OrganizationMemberInfo"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** OrganizationRolesResponse */
        OrganizationRolesResponse: {
            /** Items */
            items: components["schemas"]["RoleItem"][];
            /** Total */
            total: number;
        };
        /**
         * OtpRequestSchema
         * @description Step 1 of signup — request an email OTP.
         */
        OtpRequestSchema: {
            /**
             * Email
             * Format: email
             */
            email: string;
        };
        /**
         * OtpVerifySchema
         * @description Step 2 of signup — verify the OTP and receive email_verification_token.
         */
        OtpVerifySchema: {
            /**
             * Email
             * Format: email
             */
            email: string;
            /** Code */
            code: string;
        };
        /** ParticipantActionResponse */
        ParticipantActionResponse: {
            /** Event Id */
            event_id: string;
            /** User Id */
            user_id: string;
            /** Message */
            message: string;
        };
        /** ParticipantAttendanceUpdateRequest */
        ParticipantAttendanceUpdateRequest: {
            /** Attended */
            attended: boolean;
        };
        /**
         * ParticipantCompleteRequest
         * @description Manual admin override — see (background-job) in
         *     participant_service.py for the real computation path.
         */
        ParticipantCompleteRequest: {
            /** Rank */
            rank?: number | null;
        };
        /** ParticipantInfo */
        ParticipantInfo: {
            /** User Id */
            user_id: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Rank */
            rank: number | null;
            /** Completed At */
            completed_at: string | null;
            /**
             * Joined At
             * Format: date-time
             */
            joined_at: string;
        };
        /** ParticipantJoinRequest */
        ParticipantJoinRequest: {
            /** User Id */
            user_id: string;
            /**
             * Is Invite
             * @description True if an admin is inviting this user; sets invited_at.
             * @default false
             */
            is_invite: boolean;
        };
        /** ParticipantJoinResponse */
        ParticipantJoinResponse: {
            /** Challenge Id */
            challenge_id: string;
            /** User Id */
            user_id: string;
            /** Message */
            message: string;
        };
        /** ParticipantListResponse */
        ParticipantListResponse: {
            /** Items */
            items: components["schemas"]["ParticipantInfo"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** ParticipantProgressResponse */
        ParticipantProgressResponse: {
            /** Challenge Id */
            challenge_id: string;
            /** User Id */
            user_id: string;
            /** Target Type */
            target_type: string;
            /** Target Value */
            target_value: string | null;
            /** Current Value */
            current_value: string;
            /** Percent Complete */
            percent_complete: string | null;
            /** Completed At */
            completed_at: string | null;
            /** Days Remaining */
            days_remaining: number | null;
            /** Daily Entries */
            daily_entries: components["schemas"]["DailyProgressEntry"][];
            /** Days Met Target */
            days_met_target: number | null;
            /** Days Logged */
            days_logged: number;
        };
        /** ParticipantStatusUpdateRequest */
        ParticipantStatusUpdateRequest: {
            /**
             * Status
             * @description invited | accepted | declined | pending
             */
            status: string;
        };
        /** PaymentVerificationResponse */
        PaymentVerificationResponse: {
            transaction: components["schemas"]["TransactionResponse"];
            /** Provider Status */
            provider_status: string;
            /** Reconciled */
            reconciled: boolean;
        };
        /**
         * PermissionGrantDetail
         * @description Single permission grant with full scope detail.
         */
        PermissionGrantDetail: {
            /** Permission Name */
            permission_name: string;
            /** Category */
            category: string | null;
            /** Catalogue Scope */
            catalogue_scope: string;
            /** Grant Scope */
            grant_scope: string;
            /** Branch Id */
            branch_id: string | null;
            /** Granted By */
            granted_by: string | null;
            /** Granted At */
            granted_at: string | null;
        };
        /** PermissionGrantRequest */
        PermissionGrantRequest: {
            /**
             * Permission Name
             * @description e.g. 'branch.update'
             */
            permission_name: string;
            /**
             * Branch Id
             * @description Omit or null for an org-wide grant. Provide a branch_id to scope the grant to that branch. Only valid if the permission's catalogue scope is 'both' — 'org'-scope permissions reject a non-null branch_id.
             */
            branch_id?: string | null;
        };
        /** PermissionGrantResponse */
        PermissionGrantResponse: {
            /** Id */
            id: string;
            /** User Id */
            user_id: string;
            /** Permission Name */
            permission_name: string;
            /** Organization Id */
            organization_id: string;
            /** Branch Id */
            branch_id: string | null;
            /** Granted By */
            granted_by: string;
            /**
             * Replaced Branch Grants
             * @description Branch IDs whose branch-scoped grant for this permission was removed because this org-wide grant now supersedes them. Empty if this wasn't an org-wide grant, or the user held no branch-scoped grants to replace.
             */
            replaced_branch_grants?: string[];
            /** Message */
            message: string;
        };
        /** PermissionGrantSchema */
        PermissionGrantSchema: {
            /** Name */
            name: string;
            /** Branch Id */
            branch_id?: string | null;
        };
        /** PermissionItem */
        PermissionItem: {
            /** Id */
            id: string;
            /** Name */
            name: string;
            /** Description */
            description: string | null;
            /** Category */
            category?: string | null;
            /** Scope */
            scope: string;
        };
        /** PermissionRevokeRequest */
        PermissionRevokeRequest: {
            /** Permission Name */
            permission_name: string;
            /**
             * Branch Id
             * @description Must match the exact grant being revoked — None revokes the org-wide grant, a branch_id revokes only that branch's grant.
             */
            branch_id?: string | null;
        };
        /** PermissionRevokeResponse */
        PermissionRevokeResponse: {
            /** User Id */
            user_id: string;
            /** Permission Name */
            permission_name: string;
            /** Branch Id */
            branch_id: string | null;
            /** Message */
            message: string;
        };
        /** PermissionsResponse */
        PermissionsResponse: {
            /** Items */
            items: components["schemas"]["PermissionItem"][];
            /** Total */
            total: number;
        };
        /** PinActionResponse */
        PinActionResponse: {
            /** Message Id */
            message_id: string;
            /** Is Pinned */
            is_pinned: boolean;
            /** Message */
            message: string;
        };
        /** PlanListResponse */
        PlanListResponse: {
            /** Items */
            items: components["schemas"]["PlanResponse"][];
        };
        /** PlanResponse */
        PlanResponse: {
            /** Id */
            id: string;
            /** Name */
            name: string;
            /** Billing Interval */
            billing_interval: string;
            /** Amount */
            amount: number;
            /** Currency */
            currency: string;
            /** Features */
            features: Record<string, never>;
        };
        /** PostCreateRequest */
        PostCreateRequest: {
            /** Branch Id */
            branch_id?: string | null;
            /** Content */
            content?: string | null;
            /** Media Url */
            media_url?: string | null;
            /** Media Type */
            media_type?: string | null;
        };
        /** PostLikerInfo */
        PostLikerInfo: {
            /** User Id */
            user_id: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
        };
        /** PostLikersListResponse */
        PostLikersListResponse: {
            /** Items */
            items: components["schemas"]["PostLikerInfo"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** PostListResponse */
        PostListResponse: {
            /** Items */
            items: components["schemas"]["PostResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** PostResponse */
        PostResponse: {
            /** Id */
            id: string;
            /** User Id */
            user_id: string;
            /** Organization Id */
            organization_id: string;
            /** Branch Id */
            branch_id: string | null;
            /** Content */
            content: string | null;
            /** Media Url */
            media_url: string | null;
            /** Media Type */
            media_type: string | null;
            /** Like Count */
            like_count: number;
            /** Comment Count */
            comment_count: number;
            /** Share Count */
            share_count: number;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at: string;
        };
        /** PostUpdateRequest */
        PostUpdateRequest: {
            /** Content */
            content?: string | null;
            /** Media Url */
            media_url?: string | null;
            /** Media Type */
            media_type?: string | null;
        };
        /** PreferencesResponse */
        PreferencesResponse: {
            /** Email Notifications */
            email_notifications: boolean;
            /** Push Notifications */
            push_notifications: boolean;
            /** Challenge Reminders */
            challenge_reminders: boolean;
            /** Public Profile */
            public_profile: boolean;
            /** Show Activity */
            show_activity: boolean;
            /**
             * Theme
             * @enum {string}
             */
            theme: "light" | "dark";
        };
        /** PreferencesUpdateRequest */
        PreferencesUpdateRequest: {
            /** Email Notifications */
            email_notifications?: boolean | null;
            /** Push Notifications */
            push_notifications?: boolean | null;
            /** Challenge Reminders */
            challenge_reminders?: boolean | null;
            /** Public Profile */
            public_profile?: boolean | null;
            /** Show Activity */
            show_activity?: boolean | null;
            /** Theme */
            theme?: ("light" | "dark") | null;
        };
        /** PriorityItemSchema */
        PriorityItemSchema: {
            /**
             * Priority
             * @enum {string}
             */
            priority: "reduce_stress" | "build_energy" | "improve_balance" | "save_better" | "stay_active" | "feel_connected";
            /** Rank */
            rank: number;
        };
        /** PriorityListResponse */
        PriorityListResponse: {
            /** Items */
            items: components["schemas"]["PriorityResponse"][];
        };
        /** PriorityResponse */
        PriorityResponse: {
            /** Id */
            id: string;
            /** Priority */
            priority: string;
            /** Rank */
            rank: number;
        };
        /**
         * PrioritySetRequest
         * @description Full replacement of the caller's priority list, in rank order.
         *     Item 0 = rank 1 (highest). Replacing rather than patching avoids
         *     partial-update ambiguity around rank gaps/dupes.
         */
        PrioritySetRequest: {
            /** Priorities */
            priorities: string[];
        };
        /** ProfileResponse */
        ProfileResponse: {
            /** Id */
            id: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Email */
            email: string;
            /** Avatar Url */
            avatar_url: string | null;
            /** Country */
            country: string | null;
            /** State */
            state: string | null;
        };
        /** ProfileUpdateRequest */
        ProfileUpdateRequest: {
            /** First Name */
            first_name?: string | null;
            /** Last Name */
            last_name?: string | null;
            /** Country */
            country?: string | null;
            /** State */
            state?: string | null;
        };
        /** ProgressEntryResponse */
        ProgressEntryResponse: {
            /** Entry Date */
            entry_date?: string | null;
            /** Value */
            value: string;
            /** Source */
            source: string;
            /**
             * Already Completed
             * @default false
             */
            already_completed: boolean;
            /** Message */
            message?: string | null;
        };
        /** ProgressSubmitRequest */
        ProgressSubmitRequest: {
            /** Value */
            value: number | string;
            /**
             * Source
             * @default mobile
             */
            source: string;
        };
        /** PulseQuestionResult */
        PulseQuestionResult: {
            /** Percent */
            percent: string | null;
            /** Status */
            status: string | null;
        };
        /** PulseSnapshotListResponse */
        PulseSnapshotListResponse: {
            /** Items */
            items: components["schemas"]["PulseSnapshotResponse"][];
        };
        /** PulseSnapshotResponse */
        PulseSnapshotResponse: {
            /** Window Id */
            window_id: string;
            /** Stress Manageability Pct */
            stress_manageability_pct: string | null;
            /** Energy Recovery Pct */
            energy_recovery_pct: string | null;
            /** Connection Belonging Pct */
            connection_belonging_pct: string | null;
            /** Workload Sustainability Pct */
            workload_sustainability_pct: string | null;
            /** Workplace Comfort Pct */
            workplace_comfort_pct: string | null;
            /** Priority Support Pct */
            priority_support_pct: string | null;
            /** Needs Attention Pct */
            needs_attention_pct: string | null;
            /** Doing Well Pct */
            doing_well_pct: string | null;
            /** Respondent Count */
            respondent_count: number;
            /**
             * Computed At
             * Format: date-time
             */
            computed_at: string;
        };
        /** PushTokenRegisterRequest */
        PushTokenRegisterRequest: {
            /** Token */
            token: string;
            /**
             * Provider
             * @default expo
             * @enum {string}
             */
            provider: "expo" | "fcm" | "apns";
            /**
             * Platform
             * @enum {string}
             */
            platform: "ios" | "android";
            /** Device Id */
            device_id?: string | null;
        };
        /** PushTokenResponse */
        PushTokenResponse: {
            /** Id */
            id: string;
            /** Provider */
            provider: string;
            /** Platform */
            platform: string;
            /** Device Id */
            device_id: string | null;
            /** Is Active */
            is_active: boolean;
        };
        /** RefreshRequest */
        RefreshRequest: {
            /** Refresh Token */
            refresh_token: string;
        };
        /** ResetPasswordRequest */
        ResetPasswordRequest: {
            /** Reset Token */
            reset_token: string;
            /** New Password */
            new_password: string;
        };
        /** RoleCopyRequest */
        RoleCopyRequest: {
            /** Name */
            name: string;
        };
        /** RoleCreateRequest */
        RoleCreateRequest: {
            /** Name */
            name: string;
            /** Description */
            description?: string | null;
            /** Branch Id */
            branch_id?: string | null;
        };
        /** RoleItem */
        RoleItem: {
            /** Id */
            id: string;
            /** Name */
            name: string;
            /** Description */
            description: string | null;
            /** Branch Id */
            branch_id?: string | null;
            /**
             * Is System
             * @default true
             */
            is_system: boolean;
            /**
             * Is Default
             * @default false
             */
            is_default: boolean;
            /**
             * User Count
             * @default 0
             */
            user_count: number;
            /** Permissions */
            permissions?: string[];
            /** Permission Scopes */
            permission_scopes?: {
                [key: string]: string;
            };
        };
        /** RolePermissionsUpdateRequest */
        RolePermissionsUpdateRequest: {
            /** Permission Names */
            permission_names: string[];
        };
        /** SaveActionResponse */
        SaveActionResponse: {
            /** Post Id */
            post_id: string;
            /** User Id */
            user_id: string;
            /** Saved */
            saved: boolean;
            /** Message */
            message: string;
        };
        /** SavedPostsListResponse */
        SavedPostsListResponse: {
            /** Items */
            items: components["schemas"]["PostResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** SendInviteRequest */
        SendInviteRequest: {
            /**
             * Invited Email
             * Format: email
             */
            invited_email: string;
            /** Invited Department Id */
            invited_department_id: string;
            /** Invited Role Id */
            invited_role_id: string;
            /**
             * Branch Id
             * @description Branch to assign the invitee to. Required — every invite must target a branch.
             */
            branch_id: string;
        };
        /** SendInviteResponse */
        SendInviteResponse: {
            /** Invite Id */
            invite_id: string;
            /** Invited Email */
            invited_email: string;
            /** Organization Id */
            organization_id: string;
            /** Branch Id */
            branch_id: string;
            /** Invited Department Id */
            invited_department_id: string;
            /** Invited Role Id */
            invited_role_id: string;
            /** Status */
            status: string;
            /** Expires At */
            expires_at: string;
        };
        /** SessionItemResponse */
        SessionItemResponse: {
            /** Id */
            id: string;
            /** Device Name */
            device_name: string | null;
            /** Ip Address */
            ip_address: string | null;
            /** Location Label */
            location_label: string | null;
            /**
             * Last Seen At
             * Format: date-time
             */
            last_seen_at: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Is Current
             * @default false
             */
            is_current: boolean;
        };
        /** SessionListResponse */
        SessionListResponse: {
            /** Items */
            items: components["schemas"]["SessionItemResponse"][];
        };
        /** ShareCreateRequest */
        ShareCreateRequest: {
            /**
             * Destination Type
             * @description 'club' or 'event'
             */
            destination_type?: string | null;
            /** Destination Id */
            destination_id?: string | null;
        };
        /** ShareResponse */
        ShareResponse: {
            /** Post Id */
            post_id: string;
            /** User Id */
            user_id: string;
            /** Message */
            message: string;
        };
        /** StoryCreateRequest */
        StoryCreateRequest: {
            /**
             * Branch Id
             * @description Null = org-level story.
             */
            branch_id?: string | null;
            /** Media Url */
            media_url: string;
            /**
             * Media Type
             * @description 'image' or 'video'
             * @default image
             */
            media_type: string;
        };
        /** StoryListResponse */
        StoryListResponse: {
            /** Items */
            items: components["schemas"]["StoryResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** StoryResponse */
        StoryResponse: {
            /** Id */
            id: string;
            /** User Id */
            user_id: string;
            /** Organization Id */
            organization_id: string;
            /** Branch Id */
            branch_id: string | null;
            /** Media Url */
            media_url: string;
            /** Media Type */
            media_type: string;
            /**
             * Expires At
             * Format: date-time
             */
            expires_at: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
        };
        /** SubscriptionResponse */
        SubscriptionResponse: {
            /** Id */
            id: string;
            /** Plan Id */
            plan_id: string;
            /** Status */
            status: string;
            /** Auto Renew */
            auto_renew: boolean;
            /**
             * Current Period Start
             * Format: date-time
             */
            current_period_start: string;
            /**
             * Current Period End
             * Format: date-time
             */
            current_period_end: string;
            /** Trial Ends At */
            trial_ends_at: string | null;
            /** Cancelled At */
            cancelled_at: string | null;
        };
        /** SurveyCadenceRequest */
        SurveyCadenceRequest: {
            /**
             * Cadence
             * @description 'weekly' | 'biweekly' | 'monthly'
             */
            cadence: string;
        };
        /** SurveyConfigResponse */
        SurveyConfigResponse: {
            /** Organization Id */
            organization_id: string;
            /** Cadence */
            cadence: string;
            /** Is Active */
            is_active: boolean;
        };
        /** SurveyQuestionInfo */
        SurveyQuestionInfo: {
            /** Question Key */
            question_key: string;
            /** Question Text */
            question_text: string;
        };
        /** SurveySubmitRequest */
        SurveySubmitRequest: {
            /**
             * Answers
             * @description Map of question_key -> 1-5 response. All 5 fixed questions required.
             */
            answers: {
                [key: string]: number;
            };
        };
        /** SystemRolesResponse */
        SystemRolesResponse: {
            /** Items */
            items: components["schemas"]["RoleItem"][];
            /** Total */
            total: number;
        };
        /** TargetListResponse */
        TargetListResponse: {
            /** Items */
            items: components["schemas"]["TargetResponse"][];
        };
        /** TargetProgressResponse */
        TargetProgressResponse: {
            /** Branch Id */
            branch_id: string;
            /** Metric Type */
            metric_type: string;
            /** Period */
            period: string;
            /** Target Value */
            target_value: string | null;
            /** Current Value */
            current_value: string;
            /** Percent Complete */
            percent_complete: string | null;
            /** Has Target */
            has_target: boolean;
        };
        /** TargetResponse */
        TargetResponse: {
            /** Id */
            id: string;
            /** Branch Id */
            branch_id: string;
            /** Metric Type */
            metric_type: string;
            /** Period */
            period: string;
            /** Target Value */
            target_value: string;
        };
        /** TargetSetRequest */
        TargetSetRequest: {
            /**
             * Metric Type
             * @description e.g. steps, distance
             */
            metric_type: string;
            /**
             * Period Type
             * @description 'daily' | 'weekly' | 'monthly'
             */
            period_type: string;
            /**
             * Period
             * @description Period label matching period_type, e.g. '2026-07', '2026-W30', '2026-07-25'
             */
            period: string;
            /** Target Value */
            target_value: number | string;
        };
        /** TicketAdminItem */
        TicketAdminItem: {
            /** Id */
            id: string;
            /** User Id */
            user_id: string;
            /** Organization Id */
            organization_id: string;
            /** Name */
            name: string;
            /** Email */
            email: string;
            /** Subject */
            subject: string;
            /** Message */
            message: string;
            /** Status */
            status: string;
            /** Created At */
            created_at: string;
        };
        /** TicketAdminListResponse */
        TicketAdminListResponse: {
            /** Items */
            items: components["schemas"]["TicketAdminItem"][];
            /** Total */
            total: number;
        };
        /** TicketCreateRequest */
        TicketCreateRequest: {
            /** Name */
            name: string;
            /**
             * Email
             * Format: email
             */
            email: string;
            /** Subject */
            subject: string;
            /** Message */
            message: string;
        };
        /** TicketCreateResponse */
        TicketCreateResponse: {
            /** Accepted */
            accepted: boolean;
            /** Ticket Id */
            ticket_id: string;
            /** Status */
            status: string;
        };
        /** TicketStatusRequest */
        TicketStatusRequest: {
            /** Status */
            status: string;
        };
        /** TicketStatusResponse */
        TicketStatusResponse: {
            /** Id */
            id: string;
            /** Status */
            status: string;
        };
        /** ToggleIntegrationRequest */
        ToggleIntegrationRequest: {
            /** Enabled */
            enabled: boolean;
        };
        /** ToggleIntegrationResponse */
        ToggleIntegrationResponse: {
            /** Enabled */
            enabled: boolean;
        };
        /**
         * TokenResponse
         * @description Full JWT pair — returned on login (no 2FA) and after 2FA verify.
         */
        TokenResponse: {
            /** Access Token */
            access_token: string;
            /** Refresh Token */
            refresh_token: string;
            /**
             * Token Type
             * @default bearer
             */
            token_type: string;
        };
        /** TransactionListResponse */
        TransactionListResponse: {
            /** Items */
            items: components["schemas"]["TransactionResponse"][];
            /** Total */
            total: number;
            /** Offset */
            offset: number;
            /** Limit */
            limit: number;
        };
        /** TransactionResponse */
        TransactionResponse: {
            /** Id */
            id: string;
            /** Amount */
            amount: number;
            /** Currency */
            currency: string;
            /** Status */
            status: string;
            /** Payment Method */
            payment_method: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** External Reference */
            external_reference: string;
        };
        /** TrendingHashtagResponse */
        TrendingHashtagResponse: {
            /** Tag Name */
            tag_name: string;
            /** Total Post Count */
            total_post_count: number;
            /** Trend Score */
            trend_score: string;
            /** Window End */
            window_end: string;
        };
        /** TrendingHashtagsListResponse */
        TrendingHashtagsListResponse: {
            /** Items */
            items: components["schemas"]["TrendingHashtagResponse"][];
        };
        /** TwoFaConfirmRequest */
        TwoFaConfirmRequest: {
            /** Code */
            code: string;
        };
        /**
         * TwoFaDisableRequest
         * @description Disable 2FA. Requires the current password as confirmation.
         */
        TwoFaDisableRequest: {
            /** Password */
            password: string;
        };
        /**
         * TwoFaSetupRequest
         * @description Enable 2FA for the authenticated user.
         *
         *     method="totp": server generates + returns a TOTP secret (for QR code).
         *                    Client must complete verify_totp before 2FA is activated.
         *     method="sms":  phone_number required; OTP sent via SMS.
         *     method="email": OTP sent to the user's registered email.
         */
        TwoFaSetupRequest: {
            /**
             * Method
             * @enum {string}
             */
            method: "totp" | "sms" | "email";
            /** Phone Number */
            phone_number?: string | null;
        };
        /**
         * TwoFaSetupResponse
         * @description Returned after setup initiation.
         *
         *     totp_secret / totp_uri are only populated when method="totp";
         *     they are None for sms / email methods.
         *
         *     The setup is NOT active until the user completes /auth/2fa/verify
         *     with a valid first code — this confirms they have the secret stored.
         */
        TwoFaSetupResponse: {
            /** Method */
            method: string;
            /** Totp Secret */
            totp_secret?: string | null;
            /** Totp Uri */
            totp_uri?: string | null;
        };
        /**
         * TwoFaVerifyRequest
         * @description Complete a 2FA challenge to receive the full JWT pair.
         */
        TwoFaVerifyRequest: {
            /** Two Fa Challenge Token */
            two_fa_challenge_token: string;
            /** Code */
            code: string;
        };
        /** UnreadCountResponse */
        UnreadCountResponse: {
            /** Unread Count */
            unread_count: number;
        };
        /** UploadRequestSchema */
        UploadRequestSchema: {
            /** Domain */
            domain: string;
            /** Content Type */
            content_type: string;
        };
        /** UploadResponse */
        UploadResponse: {
            /** Upload Url */
            upload_url: string;
            /** Object Key */
            object_key: string;
            /** Media Url */
            media_url: string;
            /** Content Type */
            content_type: string;
        };
        /** UserActivityCountResponse */
        UserActivityCountResponse: {
            /** User Id */
            user_id: string;
            /** Total Count */
            total_count: number;
        };
        /** UserMeResponse */
        UserMeResponse: {
            /** User Id */
            user_id: string;
            /** Email */
            email: string;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /** Role */
            role: string;
            /** Organization Id */
            organization_id: string;
            /** Branch Id */
            branch_id: string;
            /** Department Id */
            department_id: string | null;
            /** Location */
            location: string | null;
            /** Phone Number */
            phone_number: string | null;
            /** Status */
            status: string;
            /** Permissions */
            permissions: components["schemas"]["PermissionGrantSchema"][];
            /** Avatar Url */
            avatar_url: string | null;
            /** Two Fa Enabled */
            two_fa_enabled: boolean;
            /** Two Fa Method */
            two_fa_method: string | null;
        };
        /**
         * UserPermissionsResponse
         * @description All permissions held by a user, with scope details.
         */
        UserPermissionsResponse: {
            /** User Id */
            user_id: string;
            /** Organization Id */
            organization_id: string;
            /** Total */
            total: number;
            /** Permissions */
            permissions: components["schemas"]["PermissionGrantDetail"][];
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /**
         * WellbeingAggregateResponse
         * @description Aggregate-only — never breaks down to individual scores. See
         *     ANONYMITY_THRESHOLD in the service layer.
         */
        WellbeingAggregateResponse: {
            /** Dimension Id */
            dimension_id: string;
            /** Period */
            period: string;
            /** Average Score */
            average_score: string | null;
            /** Participant Count */
            participant_count: number;
            /**
             * Suppressed
             * @description True if participant_count was below the anonymity threshold — average_score will be null.
             */
            suppressed: boolean;
        };
        /**
         * WellbeingBaselineSchema
         * @description All 4 wellbeing dimensions captured at registration.
         *     Becomes 4 UserWellbeingBaseline rows — one per entry.
         *
         *     Reused later for the owner's post-login onboarding route.
         */
        WellbeingBaselineSchema: {
            /** Entries */
            entries: components["schemas"]["BaselineDimensionSchema"][];
        };
        /** WellbeingChallengeListResponse */
        WellbeingChallengeListResponse: {
            /** Items */
            items: components["schemas"]["WellbeingChallengeResponse"][];
        };
        /** WellbeingChallengeResponse */
        WellbeingChallengeResponse: {
            /** Id */
            id: string;
            /** Name */
            name: string;
        };
        /** WellbeingDimensionListResponse */
        WellbeingDimensionListResponse: {
            /** Items */
            items: components["schemas"]["WellbeingDimensionResponse"][];
        };
        /** WellbeingDimensionResponse */
        WellbeingDimensionResponse: {
            /** Id */
            id: string;
            /** Name */
            name: string;
        };
        /** WellbeingScoreListResponse */
        WellbeingScoreListResponse: {
            /** Items */
            items: components["schemas"]["WellbeingScoreResponse"][];
        };
        /** WellbeingScoreResponse */
        WellbeingScoreResponse: {
            /** Dimension Id */
            dimension_id: string;
            /** Score */
            score: string;
            /** Period */
            period: string;
        };
        /** TrendData */
        app__schemas__challenge__TrendData: {
            /** Current */
            current: number;
            /** Previous */
            previous: number;
            /** Change Pct */
            change_pct: number;
        };
        /** TrendData */
        app__schemas__organization__TrendData: {
            /** Current */
            current: number;
            /** Previous */
            previous: number | null;
            /** Change Pct */
            change_pct: number | null;
        };
        /** TwoFaChallengeResponse */
        TwoFaChallengeResponse: {
            /** @constant */
            two_fa_required: true;
            two_fa_challenge_token: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    signup_otp_request_auth_signup_otp_request_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OtpRequestSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    signup_otp_verify_auth_signup_otp_verify_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OtpVerifySchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    signup_check_business_name_auth_signup_check_business_name_get: {
        parameters: {
            query: {
                name: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    signup_check_phone_auth_signup_check_phone_get: {
        parameters: {
            query: {
                number: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    signup_auth_signup_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OrgOwnerRegisterRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    invite_otp_request_auth_invite_otp_request_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InviteOtpRequestSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    invite_otp_verify_auth_invite_otp_verify_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InviteOtpVerifySchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    register_invited_auth_register_invite_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InviteRegisterRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InviteRegistrationResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    login_auth_login_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginRequest"];
            };
        };
        responses: {
            /** @description Token pair (2FA disabled) or 2FA challenge token */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenResponse"] | components["schemas"]["TwoFaChallengeResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    login_google_auth_login_google_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OAuthRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    login_apple_auth_login_apple_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OAuthRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    two_fa_verify_auth_2fa_verify_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TwoFaVerifyRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    two_fa_setup_auth_2fa_setup_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TwoFaSetupRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TwoFaSetupResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    two_fa_disable_auth_2fa_disable_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TwoFaDisableRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    two_fa_confirm_auth_2fa_confirm_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TwoFaConfirmRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_sessions_auth_sessions_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SessionListResponse"];
                };
            };
        };
    };
    revoke_session_auth_sessions__session_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    refresh_auth_refresh_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RefreshRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessTokenResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    logout_route_auth_logout_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RefreshRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    me_auth_me_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserMeResponse"];
                };
            };
        };
    };
    list_departments_route_organizations__org_id__departments_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_department_route_organizations__org_id__departments_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DepartmentCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_branch_departments_route_organizations__org_id__branches__branch_id__departments_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_department_route_organizations__org_id__departments__dept_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                dept_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_department_route_organizations__org_id__departments__dept_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                dept_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DepartmentDeleteRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentDeleteResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    edit_department_route_organizations__org_id__departments__dept_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                dept_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DepartmentUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    assign_user_to_department_route_organizations__org_id__departments__dept_id__members__user_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                dept_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentMemberAssignResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_department_members_route_organizations__org_id__departments__dept_id__members_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                dept_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentMembersListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    assign_department_head_route_organizations__org_id__departments__dept_id__head__user_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                dept_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentHeadAssignResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    remove_department_head_route_organizations__org_id__departments__dept_id__head_delete: {
        parameters: {
            query?: {
                /** @description If true, reverts the former head's role to 'member'. */
                revert_role?: boolean;
            };
            header?: never;
            path: {
                org_id: string;
                dept_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentHeadRemoveResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_invites_route_organizations__org_id__invites_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
                /** @description Filter by invite status. Omit to return all. */
                status?: ("pending" | "accepted" | "expired" | "cancelled") | null;
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InviteListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    send_invite_route_organizations__org_id__invites_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SendInviteRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SendInviteResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_pending_invite_route_organizations__org_id__invites__invite_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                invite_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_organization_members_route_organizations__org_id__members_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrganizationMembersListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_clubs_route_organizations__org_id__clubs_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
                privacy?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClubListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    org_stats_route_organizations__org_id__stats_get: {
        parameters: {
            query?: {
                user_status?: ("pending" | "active" | "inactive" | "suspended") | null;
                challenge_status?: ("draft" | "active" | "completed" | "cancelled" | "archived") | null;
                event_status?: ("scheduled" | "ongoing" | "completed" | "cancelled") | null;
                /** @description Omit for all-time stats (default). Set to compare against a baseline for trend %. */
                period?: ("week" | "month" | "three_months" | "six_months" | "nine_months" | "year" | "custom") | null;
                /** @description Required when period='custom'. */
                start_date?: string | null;
                /** @description Optional, defaults to today when period='custom'. */
                end_date?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgStatsResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    branch_stats_route_organizations__org_id__branches__branch_id__stats_get: {
        parameters: {
            query?: {
                user_status?: ("pending" | "active" | "inactive" | "suspended") | null;
                challenge_status?: ("upcoming" | "active" | "completed" | "cancelled" | "archived") | null;
                event_status?: ("scheduled" | "ongoing" | "completed" | "cancelled") | null;
                period?: ("week" | "month" | "three_months" | "six_months" | "nine_months" | "year" | "custom") | null;
                /** @description Required when period='custom'. */
                start_date?: string | null;
                /** @description Optional, defaults to today when period='custom'. */
                end_date?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BranchStatsResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_system_roles_roles_system_get: {
        parameters: {
            query?: {
                assignable_only?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SystemRolesResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_organization_roles_organizations__org_id__roles_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrganizationRolesResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_organization_role_organizations__org_id__roles_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RoleCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RoleItem"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_organization_role_organizations__org_id__roles__role_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                role_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    copy_role_organizations__org_id__roles__role_id__copy_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                role_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RoleCopyRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RoleItem"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_role_permissions_organizations__org_id__roles__role_id__permissions_put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                role_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RolePermissionsUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RoleItem"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    change_member_system_role_organizations__org_id__members__user_id__system_role_put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MemberRoleUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    change_member_custom_role_organizations__org_id__members__user_id__custom_role_put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MemberRoleUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    revoke_member_role_organizations__org_id__members__user_id__role_delete: {
        parameters: {
            query?: {
                branch_id?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_permissions_permissions_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PermissionsResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_branches_route_organizations__org_id__branches_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BranchListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_branch_route_organizations__org_id__branches_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BranchCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BranchResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_branch_route_organizations__org_id__branches__branch_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BranchResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_branch_route_organizations__org_id__branches__branch_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    edit_branch_route_organizations__org_id__branches__branch_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BranchUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BranchResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_branch_members_route_organizations__org_id__branches__branch_id__members_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BranchMembersListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    assign_user_to_branch_route_organizations__org_id__branches__branch_id__members__user_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BranchMemberAssignRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BranchMemberAssignResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    assign_branch_manager_route_organizations__org_id__branches__branch_id__manager_put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BranchManagerAssignRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BranchManagerResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    unassign_branch_manager_route_organizations__org_id__branches__branch_id__manager_delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BranchManagerResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    branch_activity_summary_route_organizations__org_id__branches__branch_id__activities_summary_get: {
        parameters: {
            query?: {
                period?: string | null;
                start_date?: string | null;
                end_date?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ActivitySummaryResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_branch_clubs_route_organizations__org_id__branches__branch_id__clubs_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
                privacy?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClubListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_club_route_organizations__org_id__branches__branch_id__clubs_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ClubCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClubResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_club_route_organizations__org_id__clubs__club_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                club_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClubResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_club_route_organizations__org_id__clubs__club_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                club_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClubDeleteResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    edit_club_route_organizations__org_id__clubs__club_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                club_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ClubUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClubResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    join_club_route_organizations__org_id__clubs__club_id__members__user_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                club_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClubJoinResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    remove_club_member_route_organizations__org_id__clubs__club_id__members__user_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                club_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClubRemoveMemberResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    leave_club_route_organizations__org_id__clubs__club_id__members__user_id__leave_delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                club_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClubLeaveResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_club_members_route_organizations__org_id__clubs__club_id__members_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                club_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClubMembersListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_user_permissions_route_organizations__org_id__members__user_id__permissions_get: {
        parameters: {
            query?: {
                /** @description Scope the check to this branch. Omit for an org-wide check. */
                branch_id?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserPermissionsResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    grant_permission_route_organizations__org_id__members__user_id__permissions_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PermissionGrantRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PermissionGrantResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    revoke_permission_route_organizations__org_id__members__user_id__permissions_delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PermissionRevokeRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PermissionRevokeResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_events_route_organizations__org_id__events_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_event_route_organizations__org_id__events_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EventCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_event_route_organizations__org_id__events__event_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                event_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_event_route_organizations__org_id__events__event_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                event_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    edit_event_route_organizations__org_id__events__event_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                event_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EventUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    cancel_event_route_organizations__org_id__events__event_id__cancel_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                event_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_event_participants_route_organizations__org_id__events__event_id__participants_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                event_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventParticipantsListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    join_event_route_organizations__org_id__events__event_id__participants_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                event_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ParticipantJoinRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ParticipantActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_participant_status_route_organizations__org_id__events__event_id__participants__user_id__status_patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                event_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ParticipantStatusUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ParticipantActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    mark_attendance_route_organizations__org_id__events__event_id__participants__user_id__attendance_patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                event_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ParticipantAttendanceUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ParticipantActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    remove_participant_route_organizations__org_id__events__event_id__participants__user_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                event_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_posts_route_organizations__org_id__posts_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
                scope?: string;
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_post_route_organizations__org_id__posts_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_saved_posts_route_organizations__org_id__posts_saved_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SavedPostsListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_likes_given_count_route_organizations__org_id__posts_likes_given_count_get: {
        parameters: {
            query?: {
                period_start?: string | null;
                period_end?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LikesGivenCountResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_posts_by_user_route_organizations__org_id__posts_users__user_id__get: {
        parameters: {
            query?: {
                period_start?: string | null;
                period_end?: string | null;
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_post_route_organizations__org_id__posts__post_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_post_route_organizations__org_id__posts__post_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    edit_post_route_organizations__org_id__posts__post_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    like_post_route_organizations__org_id__posts__post_id__like_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LikeActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    unlike_post_route_organizations__org_id__posts__post_id__like_delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LikeActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_post_likers_route_organizations__org_id__posts__post_id__likes_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostLikersListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_comments_route_organizations__org_id__posts__post_id__comments_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommentListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    add_comment_route_organizations__org_id__posts__post_id__comments_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CommentCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommentResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_comment_route_organizations__org_id__posts__post_id__comments__comment_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
                comment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    edit_comment_route_organizations__org_id__posts__post_id__comments__comment_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
                comment_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CommentUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommentResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    share_post_route_organizations__org_id__posts__post_id__share_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ShareCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShareResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    save_post_route_organizations__org_id__posts__post_id__save_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SaveActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    unsave_post_route_organizations__org_id__posts__post_id__save_delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SaveActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    search_hashtags_route_organizations__org_id__hashtags_search_get: {
        parameters: {
            query: {
                q: string;
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HashtagListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    trending_hashtags_route_organizations__org_id__hashtags_trending_get: {
        parameters: {
            query?: {
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TrendingHashtagsListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    posts_by_hashtag_route_organizations__org_id__hashtags__tag_name__posts_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                tag_name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_stories_route_organizations__org_id__stories_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
                scope?: string;
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StoryListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_story_route_organizations__org_id__stories_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["StoryCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StoryResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    my_stories_route_organizations__org_id__stories_me_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StoryListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_story_route_organizations__org_id__stories__story_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                story_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StoryResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_story_route_organizations__org_id__stories__story_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                story_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_messages_route_organizations__org_id__conversations__conversation_type___conversation_id__messages_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                conversation_type: string;
                conversation_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    send_message_route_organizations__org_id__conversations__conversation_type___conversation_id__messages_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                conversation_type: string;
                conversation_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MessageCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    pin_message_route_organizations__org_id__conversations_messages__message_id__pin_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PinActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    unpin_message_route_organizations__org_id__conversations_messages__message_id__pin_delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PinActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_message_route_organizations__org_id__conversations_messages__message_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageDeleteResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    register_push_token_route_notifications_push_tokens_put: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PushTokenRegisterRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PushTokenResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    unregister_push_token_route_notifications_push_tokens_delete: {
        parameters: {
            query: {
                token: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_notifications_route_notifications_get: {
        parameters: {
            query?: {
                unread_only?: boolean;
                offset?: number;
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NotificationListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    unread_count_route_notifications_unread_count_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UnreadCountResponse"];
                };
            };
        };
    };
    mark_notification_read_route_notifications__notification_id__read_patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                notification_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarkReadResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    mark_all_notifications_read_route_notifications_read_all_patch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarkAllReadResponse"];
                };
            };
        };
    };
    delete_notification_route_notifications__notification_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                notification_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_challenges_route_organizations__org_id__challenges_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
                /** @description 'organization' = org-wide challenges only (branch_id is null); combined with branch_id, also includes that branch's challenges. 'all' = every challenge in the org, ignoring branch boundaries (ignored if branch_id is set). */
                scope?: ("organization" | "all") | null;
                /** @description Filter challenges by status: upcoming, active, completed, cancelled, archived. Omit to fetch all statuses. */
                status?: ("upcoming" | "active" | "completed" | "cancelled" | "archived") | null;
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChallengeListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_challenge_route_organizations__org_id__challenges_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChallengeCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChallengeResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_challenge_stats_route_organizations__org_id__challenges_stats_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
                scope?: ("organization" | "all") | null;
                /** @description Omit for all-time stats (default, no trend). Set to compare against a baseline for trend %. */
                period?: ("week" | "month" | "six_months" | "custom") | null;
                /** @description Required when period='custom'. */
                start_date?: string | null;
                /** @description Optional, defaults to today when period='custom'. */
                end_date?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChallengeStatsResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_challenge_route_organizations__org_id__challenges__challenge_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChallengeResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_challenge_route_organizations__org_id__challenges__challenge_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    edit_challenge_route_organizations__org_id__challenges__challenge_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChallengeUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChallengeResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    join_challenge_route_organizations__org_id__challenges__challenge_id__join_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ParticipantJoinResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    leave_challenge_route_organizations__org_id__challenges__challenge_id__join_delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    submit_progress_route_organizations__org_id__challenges__challenge_id__progress_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProgressSubmitRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProgressEntryResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_participants_route_organizations__org_id__challenges__challenge_id__participants_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ParticipantListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    mark_participant_complete_route_organizations__org_id__challenges__challenge_id__participants__user_id__complete_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ParticipantCompleteRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ParticipantInfo"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    cancel_challenge_route_organizations__org_id__challenges__challenge_id__cancel_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChallengeResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    my_progress_route_organizations__org_id__challenges__challenge_id__progress_me_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ParticipantProgressResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    participant_progress_route_organizations__org_id__challenges__challenge_id__progress__user_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                challenge_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ParticipantProgressResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_my_activities_route_organizations__org_id__activities_me_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ActivityListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    organization_activity_summary_route_organizations__org_id__activities_summary_get: {
        parameters: {
            query?: {
                period?: string | null;
                start_date?: string | null;
                end_date?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ActivitySummaryResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    user_activity_count_route_organizations__org_id__activities_users__user_id__count_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserActivityCountResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    submit_activity_route_organizations__org_id__activity_log_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ActivitySubmitRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ActivitySubmitResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_activity_trend_route_organizations__org_id__activity_log_trend_get: {
        parameters: {
            query: {
                metric_type: string;
                granularity?: string;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ActivityTrendResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    branch_leaderboard_route_organizations__org_id__leaderboard_branch_get: {
        parameters: {
            query: {
                metric_type: string;
                period_type?: string;
                /** @description Defaults to caller's own branch. */
                branch_id?: string | null;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LeaderboardResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    org_leaderboard_route_organizations__org_id__leaderboard_org_get: {
        parameters: {
            query: {
                metric_type: string;
                period_type?: string;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LeaderboardResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_dimensions_route_wellbeing_dimensions_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WellbeingDimensionListResponse"];
                };
            };
        };
    };
    list_wellbeing_challenges_route_wellbeing_challenges_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WellbeingChallengeListResponse"];
                };
            };
        };
    };
    list_opted_in_route_organizations__org_id__wellbeing_opted_in_challenges_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgChallengeOptInListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    opt_in_route_organizations__org_id__wellbeing_opted_in_challenges_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OrgChallengeOptInRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgChallengeOptInResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    opt_out_route_organizations__org_id__wellbeing_opted_in_challenges__wellbeing_challenge_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                wellbeing_challenge_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    submit_baseline_route_wellbeing_baselines_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BaselineSubmitRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaselineResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    my_baselines_route_wellbeing_baselines_me_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaselineListResponse"];
                };
            };
        };
    };
    submit_assessment_route_wellbeing_assessments_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AssessmentSubmitRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AssessmentResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    my_assessments_route_wellbeing_assessments_me_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AssessmentListResponse"];
                };
            };
        };
    };
    my_scores_route_wellbeing_scores_me_get: {
        parameters: {
            query?: {
                period?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WellbeingScoreListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    branch_aggregate_score_route_organizations__org_id__branches__branch_id__wellbeing_scores_aggregate_get: {
        parameters: {
            query: {
                dimension_id: string;
                period: string;
            };
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WellbeingAggregateResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    org_aggregate_score_route_organizations__org_id__wellbeing_scores_aggregate_get: {
        parameters: {
            query: {
                dimension_id: string;
                period: string;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WellbeingAggregateResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_cadence_route_organizations__org_id__wellbeing_survey_config_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SurveyConfigResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    set_cadence_route_organizations__org_id__wellbeing_survey_config_put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SurveyCadenceRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SurveyConfigResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_open_window_route_organizations__org_id__wellbeing_survey_open_window_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenWindowResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    submit_response_route_organizations__org_id__wellbeing_survey_responses_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SurveySubmitRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    my_responses_route_organizations__org_id__wellbeing_survey_responses_me_get: {
        parameters: {
            query?: {
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MyResponseListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    live_pulse_route_organizations__org_id__wellbeing_survey_pulse_live_get: {
        parameters: {
            query?: {
                /** @description Omit for org-wide, or scope to one branch. */
                branch_id?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LivePulseResponse"] | components["schemas"]["LivePulseResponse"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    pulse_history_route_organizations__org_id__wellbeing_survey_pulse_history_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PulseSnapshotListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_categories_route_categories_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryListResponse"];
                };
            };
        };
    };
    list_health_categories_route_health_categories_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HealthCategoryListResponse"];
                };
            };
        };
    };
    list_priorities_route_engagement_priorities_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PriorityListResponse"];
                };
            };
        };
    };
    set_priorities_route_engagement_priorities_put: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PrioritySetRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PriorityListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_checkins_route_engagement_checkins_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CheckinListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    submit_checkin_route_engagement_checkins_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CheckinSubmitRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CheckinResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    checkin_streak_route_engagement_checkins_streak_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CheckinStreakResponse"];
                };
            };
        };
    };
    get_engagement_trend_route_engagement_log_trend_get: {
        parameters: {
            query: {
                metric_type: string;
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EngagementTrendResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_engagement_snapshot_route_engagement_log_snapshot_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EngagementSnapshotResponse"];
                };
            };
        };
    };
    request_upload_url_route_storage_upload_url_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UploadRequestSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UploadResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_targets_route_organizations__org_id__branches__branch_id__targets_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TargetListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    set_target_route_organizations__org_id__branches__branch_id__targets_put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TargetSetRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TargetResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_target_route_organizations__org_id__targets__target_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                target_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    target_progress_route_organizations__org_id__branches__branch_id__targets_progress_get: {
        parameters: {
            query: {
                metric_type: string;
                period_type: string;
                period: string;
            };
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TargetProgressResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    dashboard_bootstrap_route_organizations__org_id__dashboard_bootstrap_get: {
        parameters: {
            query?: {
                metric_type?: string;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DashboardBootstrapResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    engagement_wellbeing_trends_route_organizations__org_id__dashboard_engagement_wellbeing_trends_get: {
        parameters: {
            query?: {
                period?: "week" | "month" | "three_months";
                branch_id?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EngagementWellbeingTrendsResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    organization_department_ranks_route_organizations__org_id__department_rank_get: {
        parameters: {
            query?: {
                branch_id?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentRankListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    department_latest_rank_route_organizations__org_id__departments__dept_id__rank_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                dept_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentRankResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    department_rank_history_route_organizations__org_id__departments__dept_id__rank_history_get: {
        parameters: {
            query?: {
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
                dept_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DepartmentRankListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    kpi_overview_route_organizations__org_id__kpi_snapshots_overview_get: {
        parameters: {
            query?: {
                period?: string;
                branch_id?: string | null;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["KPIOverviewResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_branch_kpi_snapshots_route_organizations__org_id__branches__branch_id__kpi_snapshots_get: {
        parameters: {
            query: {
                metric_name: string;
                period_start: string;
                period_end: string;
            };
            header?: never;
            path: {
                org_id: string;
                branch_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["KPISnapshotListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_org_wide_kpi_snapshots_route_organizations__org_id__kpi_snapshots_org_wide_get: {
        parameters: {
            query: {
                metric_name: string;
                period_start: string;
                period_end: string;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgWideKPIResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_support_tickets_app_admin_support_tickets_get: {
        parameters: {
            query?: {
                status_filter?: string | null;
                offset?: number;
                limit?: number;
            };
            header?: {
                "x-app-admin-key"?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TicketAdminListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_support_ticket_app_admin_support_tickets__ticket_id__patch: {
        parameters: {
            query?: never;
            header?: {
                "x-app-admin-key"?: string | null;
            };
            path: {
                ticket_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TicketStatusRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TicketStatusResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_ticket_support_tickets_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TicketCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TicketCreateResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_integrations_organizations__org_id__integrations_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IntegrationListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    connect_integration_organizations__org_id__integrations__provider__connect_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                provider: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    disconnect_integration_organizations__org_id__integrations__provider__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                provider: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    toggle_integration_organizations__org_id__integrations__provider__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                provider: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ToggleIntegrationRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ToggleIntegrationResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_subscription_route_organizations__org_id__subscription_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SubscriptionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_transactions_route_organizations__org_id__transactions_get: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransactionListResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_transaction_by_reference_route_organizations__org_id__transactions__reference__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                reference: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransactionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    verify_transaction_by_reference_route_organizations__org_id__transactions__reference__verify_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
                reference: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaymentVerificationResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    initiate_checkout_route_organizations__org_id__checkout_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CheckoutRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CheckoutResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    cancel_auto_renew_route_organizations__org_id__subscription_cancel_auto_renew_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SubscriptionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_auto_renew_route_organizations__org_id__subscription_auto_renew_patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                org_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AutoRenewUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SubscriptionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    paystack_webhook_route_webhooks_paystack_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    list_available_plans_route_plans_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PlanListResponse"];
                };
            };
        };
    };
    get_preferences_route_user_settings_preferences_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PreferencesResponse"];
                };
            };
        };
    };
    update_preferences_route_user_settings_preferences_patch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PreferencesUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PreferencesResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_profile_route_user_settings_profile_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProfileResponse"];
                };
            };
        };
    };
    update_profile_route_user_settings_profile_patch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProfileUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProfileResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_avatar_route_user_settings_avatar_put: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AvatarUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AvatarUpdateResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    change_password_route_user_settings_change_password_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChangePasswordRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    forgot_password_route_auth_forgot_password_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ForgotPasswordRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    reset_password_route_auth_reset_password_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ResetPasswordRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    root__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
}
