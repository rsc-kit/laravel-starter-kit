import { section } from "@rsc-kit/core/section";
import { NavUser } from "@/components/nav-user";
import type { User } from "@/types";

// The signed-in user in the sidebar, as a section so a save that renames them
// - Settings/Profile::update - refreshes it without the whole document.
async function SignedInUser() {
    return <NavUser user={await rpc<User>("Shared.user")} />;
}

const UserMenu = section("user-menu", SignedInUser);

export default UserMenu;
