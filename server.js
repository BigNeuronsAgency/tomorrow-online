import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { v2 as cloudinary } from 'cloudinary';

const app = express();
const PORT = process.env.PORT || 3000;

// Config
const resend = new Resend(process.env.RESEND_API_KEY);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('.'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Submit brief
app.post('/api/submit-brief', async (req, res) => {
  try {
    console.log('📧 Received form submission');
    const data = req.body;

    // Upload files to Cloudinary
    let fileLinks = [];
    if (data.files && data.files.length > 0) {
      console.log('📤 Uploading', data.files.length, 'files');
      
      for (const file of data.files) {
        try {
          const result = await cloudinary.uploader.upload(file.content, {
            folder: 'tomorrow-briefs',
            resource_type: 'auto',
            public_id: `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`
          });
          
          fileLinks.push({
            name: file.name,
            url: result.secure_url,
            size: file.size
          });
          
          console.log('✅ Uploaded:', file.name);
        } catch (uploadErr) {
          console.error('❌ Upload failed:', uploadErr.message);
          fileLinks.push({ name: file.name, url: 'FAILED', size: file.size });
        }
      }
    }

    // Build email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><style>
        body{font-family:sans-serif;line-height:1.6;color:#333;margin:0;padding:0}
        .header{background:linear-gradient(135deg,#F50 0%,#F00 100%);color:#fff;padding:30px}
        .content{background:#f9f9f9;padding:30px}
        .section{background:#fff;padding:20px;margin-bottom:20px;border-radius:8px;border-left:4px solid #F50}
        h2{margin-top:0;color:#F50;font-size:18px}
        .field{margin-bottom:15px}
        .label{font-weight:600;color:#666;font-size:12px;text-transform:uppercase}
        .value{margin-top:5px;font-size:16px}
        .files{background:#fff3e0;padding:15px;border-radius:6px;margin-top:10px}
        a{color:#F50;font-weight:500;display:block;margin:8px 0}
      </style></head>
      <body>
        <div class="header"><h1>🚀 NOUVEAU LEAD - ${data.brandName || 'Projet'}</h1></div>
        <div class="content">
          <div class="section">
            <h2>📋 CONTACT</h2>
            <div class="field"><div class="label">Marque</div><div class="value">${data.brandName || '-'}</div></div>
            <div class="field"><div class="label">Email</div><div class="value">${data.email || '-'}</div></div>
            <div class="field"><div class="label">Téléphone</div><div class="value">${data.phone || '-'}</div></div>
          </div>
          <div class="section">
            <h2>💼 BUSINESS</h2>
            <div class="field"><div class="label">Pitch</div><div class="value">${data.pitch || '-'}</div></div>
            <div class="field"><div class="label">Concurrents</div><div class="value">${data.competitors || '-'}</div></div>
          </div>
          <div class="section">
            <h2>🎯 CIBLE</h2>
            <div class="field"><div class="label">Cible</div><div class="value">${data.target || '-'}</div></div>
            <div class="field"><div class="label">Problème</div><div class="value">${data.problem || '-'}</div></div>
            <div class="field"><div class="label">Solution</div><div class="value">${data.solution || '-'}</div></div>
            <div class="field"><div class="label">Pourquoi vous</div><div class="value">${data.whyUs || '-'}</div></div>
          </div>
          <div class="section">
            <h2>🎨 IDENTITÉ</h2>
            <div class="field"><div class="label">Archétype</div><div class="value">${data.archetype || '-'}</div></div>
            <div class="field"><div class="label">Vibe</div><div class="value">${data.vibeSeriousness || '-'} / ${data.vibeStyle || '-'}</div></div>
            <div class="field"><div class="label">Copywriting</div><div class="value">${data.copywriting || '-'}</div></div>
          </div>
          <div class="section">
            <h2>📦 PACK</h2>
            <div class="field"><div class="label">Pack</div><div class="value"><strong>${data.selectedPack || '-'}</strong></div></div>
            <div class="field"><div class="label">Prix / Délai</div><div class="value">${data.price || '0'}€ / ${data.delay || '0'}j</div></div>
            ${data.upsells ? `<div class="field"><div class="label">Options</div><div class="value">${data.upsells}</div></div>` : ''}
          </div>
          <div class="section">
            <h2>🌐 DOMAINE</h2>
            <div class="field"><div class="label">Domaine</div><div class="value">${data.hasDomain || 'Non'} ${data.domainName ? `(${data.domainName})` : ''}</div></div>
            <div class="field"><div class="label">Care</div><div class="value">${data.care || 'Non'}</div></div>
          </div>
          ${fileLinks.length > 0 ? `
          <div class="section">
            <h2>📎 FICHIERS (${fileLinks.length})</h2>
            <div class="files">${fileLinks.map(f => `<a href="${f.url}" target="_blank">📄 ${f.name} (${f.size})</a>`).join('')}</div>
          </div>` : ''}
        </div>
      </body>
      </html>
    `;

    // Send email
    console.log('📧 Sending email via Resend...');
    const emailResult = await resend.emails.send({
      from: 'Tomorrow Online <onboarding@resend.dev>',
      to: ['t.martella@bigneurons.com'],
      cc: ['mf.phan@bigneurons.com', 'a.escare@bigneurons.com'],
      replyTo: data.email,
      subject: `🚀 NOUVEAU LEAD - ${data.brandName || 'Projet'}`,
      html: emailHTML
    });

    console.log('✅ Email sent:', emailResult.id);

    // Auto-response
    await resend.emails.send({
      from: 'Tomorrow Online <onboarding@resend.dev>',
      to: [data.email],
      subject: 'Brief bien reçu ! 🚀',
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
        <h1 style="color:#F50">Merci pour votre confiance !</h1>
        <p style="font-size:16px">Votre brief a bien été reçu par notre équipe.</p>
        <p style="font-size:16px"><strong>Un membre de notre équipe vous appellera demain matin entre 09h00 et 10h00</strong>.</p>
      </div>`
    });

    res.json({ success: true, message: 'Brief envoyé', emailId: emailResult.id });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
