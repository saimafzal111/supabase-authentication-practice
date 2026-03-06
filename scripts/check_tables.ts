import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_ANON_KEY!
);

async function checkTables() {
    const tables = ['workers', 'inventory', 'products', 'customers', 'finance', 'reports'];
    console.log('Checking tables in Supabase...');

    for (const table of tables) {
        const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.log(`- ${table}: Not found or error: ${error.message}`);
        } else {
            console.log(`- ${table}: Found, count ${count}`);
        }
    }
}

checkTables().catch(err => {
    console.error('Execution error:', err);
});
