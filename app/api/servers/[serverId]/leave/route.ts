import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {

    try {
        const profile = currentProfile();

        if (!profile) {
            return new NextResponse('unauthorized', { status: 401 });
        };

        if (!params.serverId) {
            return new NextResponse('no server id', { status: 400 });
        };

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: {
                    not: profile.id
                },
                member: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                member: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });

        return NextResponse.json(server);

    } catch (e) {
        console.log(e);
        return new NextResponse('internal error', { status: 500 });
    };
};