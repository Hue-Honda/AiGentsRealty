-- Create leads table for capturing potential clients from AI chat
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255),
  budget VARCHAR(100),
  interested_project VARCHAR(255),
  preferred_area VARCHAR(255),
  bedrooms VARCHAR(50),
  timeline VARCHAR(100),
  investment_purpose VARCHAR(50), -- 'investment' or 'end-use'
  notes TEXT,
  source VARCHAR(50) DEFAULT 'genie_chat',
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'lost'
  conversation_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Add comment
COMMENT ON TABLE leads IS 'Leads captured from Genie AI chat conversations';
