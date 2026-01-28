import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
        .from('faq')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await req.json();

    const { data, error } = await supabase
        .from('faq')
        .insert([body])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
}

export async function PUT(req: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await req.json();
    const { id, ...updates } = body;

    const { data, error } = await supabase
        .from('faq')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
}

export async function DELETE(req: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabase
        .from('faq')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
