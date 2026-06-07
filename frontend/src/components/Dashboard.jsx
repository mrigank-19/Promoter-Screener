import { useState, useEffect } from 'react';

// Renamed component to StockDashboard to avoid name collision with your import
function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]); 
    const [toggleOn, setToggleOn] = useState(true);

    useEffect(() => {
        // Corrected variable name casing
        let targetUrl = '';

        // Switch logic maps state to API routes
        switch(toggleOn) {
            case true:
                targetUrl = `http://127.0.0.1:8000/screener`;
                break;
            case false:
                targetUrl = `http://127.0.0.1:8000/screener/trending`;
                break;
            default:
                targetUrl = `http://127.0.0.1:8000/screener`;
        }

        // Fixed: Added 'async' keyword so 'await' works inside this scope
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(targetUrl);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                setData([]); 
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    // Fixed: Added dependency array [toggleOn] so this effect fires ONLY when the toggle changes
    }, [toggleOn]);

    return (
        <div style={{ padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '1200px', margin: '0 auto', color: '#333333' }}>
            
            {/* Header and Toggle Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: 0 }}>Market Screener</h1>
                
                {/* Fixed Toggle Switch */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Visual indicator for All Stocks */}
                    <span style={{ fontSize: '14px', color: toggleOn ? '#111827' : '#9ca3af', fontWeight: toggleOn ? '600' : '400' }}>
                        All Stocks
                    </span>
                    
                    {/* The Switch Container */}
                    <button 
                        onClick={() => setToggleOn(prev => !prev)}
                        style={{
                            width: '44px', height: '24px', borderRadius: '12px', border: 'none',
                            // Background changes dynamically based on active state
                            backgroundColor: toggleOn ? '#e5e7eb' : '#111827',
                            position: 'relative', cursor: 'pointer', padding: 0, transition: 'background-color 0.2s'
                        }}
                    >
                        {/* The moving white dot */}
                        <span style={{
                            position: 'absolute', top: '2px', left: '2px', width: '20px', height: '20px', 
                            borderRadius: '50%', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            // Dot slides right when toggleOn is false (Trending)
                            transform: toggleOn ? 'translateX(0)' : 'translateX(20px)', transition: 'transform 0.2s'
                        }} />
                    </button>
                    
                    {/* Visual indicator for Trending Only */}
                    <span style={{ fontSize: '14px', color: !toggleOn ? '#111827' : '#9ca3af', fontWeight: !toggleOn ? '600' : '400' }}>
                        Trending Only
                    </span>
                </div>
            </div>

            {/* Table Area */}
            {loading ? (
                <div style={{ padding: '40px 0', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>Loading records...</div>
            ) : (
                <div style={{ width: '100%', overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563' }}>Symbol</th>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563' }}>Company Name</th>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563' }}>Mar 23</th>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563' }}>Jun 23</th>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563' }}>Sep 23</th>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563' }}>Dec 23</th>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563' }}>Mar 24</th>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563' }}>Jun 24</th>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563' }}>Sep 24</th>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563' }}>Dec 24</th>
                                <th style={{ padding: '14px 16px', fontWeight: '500', color: '#4b5563', textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: '#ffffff' }}>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan="11" style={{ padding: '30px', textAlign: 'center', color: '#9ca3af' }}>
                                        No data returned. Verify backend configuration.
                                    </td>
                                </tr>
                            ) : (
                                data.map((stock, index) => {
                                    const isTrending = stock.is_trending === true || stock.is_trending === 'True';
                                    
                                    return (
                                        <tr 
                                            key={stock.Symbol || index} 
                                            style={{ 
                                                borderBottom: index === data.length - 1 ? 'none' : '1px solid #f3f4f6',
                                                backgroundColor: isTrending ? '#fcfdf9' : '#ffffff' 
                                            }}
                                        >
                                            <td style={{ padding: '14px 16px', fontWeight: '600', color: '#111827' }}>{stock.Symbol}</td>
                                            <td style={{ padding: '14px 16px', color: '#4b5563' }}>{stock.Name}</td>
                                            <td style={{ padding: '14px 16px', color: '#111827' }}>{stock.mar_2023}</td>
                                            <td style={{ padding: '14px 16px', color: '#111827' }}>{stock.jun_2023}</td>
                                            <td style={{ padding: '14px 16px', color: '#111827' }}>{stock.sep_2023}</td>
                                            <td style={{ padding: '14px 16px', color: '#111827' }}>{stock.dec_2023}</td>
                                            <td style={{ padding: '14px 16px', color: '#111827' }}>{stock.mar_2024}</td>
                                            <td style={{ padding: '14px 16px', color: '#111827' }}>{stock.jun_2024}</td>
                                            <td style={{ padding: '14px 16px', color: '#111827' }}>{stock.sep_2024}</td>
                                            <td style={{ padding: '14px 16px', color: '#111827' }}>{stock.dec_2024}</td>
                                            <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                {isTrending ? (
                                                    <span style={{
                                                        backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0',
                                                        padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500'
                                                    }}>
                                                        Trending
                                                    </span>
                                                ) : (
                                                    <span style={{
                                                        backgroundColor: '#f9fafb', color: '#6b7280', border: '1px solid #e5e7eb',
                                                        padding: '2px 8px', borderRadius: '4px', fontSize: '12px'
                                                    }}>
                                                        Normal
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
