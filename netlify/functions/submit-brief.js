import { Resend } from 'resend';
import { v2 as cloudinary } from 'cloudinary';

// Configuration
const resend = new Resend(process.env.RESEND_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    console.log('📧 Received form data:', Object.keys(data));

    // Upload files to Cloudinary if present
    let fileLinks = [];
    if (data.files && data.files.length > 0) {
      console.log('📤 Uploading', data.files.length, 'files to Cloudinary...');
      
      for (const file of data.files) {
        try {
          // file.content is base64
          const result = await cloudinary.uploader.upload(file.content, {
            folder: 'tomorrow-briefs',
            resource_type: 'auto',
            public_id: `${Date.now()}_${file.name}`
          });
          
          fileLinks.push({
            name: file.name,
            url: result.secure_url,
            size: file.size
          });
          
          console.log('✅ Uploaded:', file.name, '→', result.secure_url);
        } catch (uploadErr) {
          console.error('❌ Upload failed for', file.name, uploadErr);
          fileLinks.push({
            name: file.name,
            url: 'UPLOAD_FAILED',
            size: file.size
          });
        }
      }
    }

    // Build email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF5500 0%, #FF0000 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #FF5500; }
          .section h2 { margin-top: 0; color: #FF5500; font-size: 18px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { margin-top: 5px; font-size: 16px; }
          .files { background: #fff3e0; padding: 15px; border-radius: 6px; margin-top: 10px; }
          .file-link { display: block; color: #FF5500; text-decoration: none; margin: 8px 0; font-weight: 500; }
          .file-link:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 NOUVEAU LEAD - ${data.brandName || 'Projet Inconnu'}</h1>
          </div>
          <div class="content">
            
            <div class="section">
              <h2>📋 CONTACT</h2>
              <div class="field">
                <div class="label">Marque</div>
                <div class="value">${data.brandName || '-'}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${data.email || '-'}</div>
              </div>
              <div class="field">
                <div class="label">Téléphone</div>
                <div class="value">${data.phone || '-'}</div>
              </div>
            </div>

            <div class="section">
              <h2>💼 BUSINESS</h2>
              <div class="field">
                <div class="label">Pitch (1 ligne)</div>
                <div class="value">${data.pitch || '-'}</div>
              </div>
              <div class="field">
                <div class="label">Concurrents</div>
                <div class="value">${data.competitors || '-'}</div>
              </div>
            </div>

            <div class="section">
              <h2>🎯 CIBLE & PROPOSITION</h2>
              <div class="field">
                <div class="label">Cible</div>
                <div class="value">${data.target || '-'}</div>
              </div>
              <div class="field">
                <div class="label">Problème client</div>
                <div class="value">${data.problem || '-'}</div>
              </div>
              <div class="field">
                <div class="label">Solution apportée</div>
                <div class="value">${data.solution || '-'}</div>
              </div>
              <div class="field">
                <div class="label">Pourquoi vous ?</div>
                <div class="value">${data.whyUs || '-'}</div>
              </div>
            </div>

            <div class="section">
              <h2>🎨 IDENTITÉ & STYLE</h2>
              <div class="field">
                <div class="label">Archétype de marque</div>
                <div class="value">${data.archetype || '-'}</div>
              </div>
              <div class="field">
                <div class="label">Vibe Sérieux/Drôle</div>
                <div class="value">${data.vibeSeriousness || '-'}</div>
              </div>
              <div class="field">
                <div class="label">Style visuel</div>
                <div class="value">${data.vibeStyle || '-'}</div>
              </div>
              <div class="field">
                <div class="label">Style copywriting</div>
                <div class="value">${data.copywriting || '-'}</div>
              </div>
            </div>

            <div class="section">
              <h2>📦 PACK & OPTIONS</h2>
              <div class="field">
                <div class="label">Pack sélectionné</div>
                <div class="value"><strong>${data.selectedPack || '-'}</strong></div>
              </div>
              <div class="field">
                <div class="label">Prix</div>
                <div class="value">${data.price || '0'}€</div>
              </div>
              <div class="field">
                <div class="label">Délai</div>
                <div class="value">${data.delay || '0'} jours</div>
              </div>
              ${data.upsells ? `
              <div class="field">
                <div class="label">Options</div>
                <div class="value">${data.upsells}</div>
              </div>
              ` : ''}
              ${data.pagesSupNames ? `
              <div class="field">
                <div class="label">Pages supplémentaires</div>
                <div class="value">${data.pagesSupNames}</div>
              </div>
              ` : ''}
              ${data.multiLangues ? `
              <div class="field">
                <div class="label">Langues</div>
                <div class="value">${data.multiLangues}</div>
              </div>
              ` : ''}
            </div>

            <div class="section">
              <h2>🌐 DOMAINE & CARE</h2>
              <div class="field">
                <div class="label">Possède un domaine</div>
                <div class="value">${data.hasDomain || 'Non'}</div>
              </div>
              ${data.domainName ? `
              <div class="field">
                <div class="label">Nom de domaine</div>
                <div class="value">${data.domainName}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Tomorrow Care (maintenance)</div>
                <div class="value">${data.care || 'Non'}</div>
              </div>
            </div>

            ${fileLinks.length > 0 ? `
            <div class="section">
              <h2>📎 FICHIERS (${fileLinks.length})</h2>
              <div class="files">
                ${fileLinks.map(f => `
                  <a href="${f.url}" class="file-link" target="_blank">
                    📄 ${f.name} (${f.size})
                  </a>
                `).join('')}
              </div>
            </div>
            ` : ''}

          </div>
        </div>
      </body>
      </html>
    `;

    // Send email via Resend
    const emailResult = await resend.emails.send({
      from: 'Tomorrow Online <onboarding@resend.dev>',
      to: ['t.martella@bigneurons.com'],
      cc: ['mf.phan@bigneurons.com', 'a.escare@bigneurons.com'],
      replyTo: data.email,
      subject: `🚀 NOUVEAU LEAD - ${data.brandName || 'Projet Inconnu'}`,
      html: emailHTML
    });

    console.log('✅ Email sent via Resend:', emailResult.id);

    // Send auto-response to client
    await resend.emails.send({
      from: 'Tomorrow Online <onboarding@resend.dev>',
      to: [data.email],
      subject: 'Brief bien reçu ! 🚀',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #FF5500;">Merci pour votre confiance !</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            Votre brief a bien été reçu par notre équipe.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            <strong>Un membre de notre équipe vous appellera demain matin entre 09h00 et 10h00</strong> 
            pour valider les détails de votre projet.
          </p>
          <p style="font-size: 14px; color: #666; margin-top: 40px;">
            À très vite,<br>
            L'équipe Tomorrow Online
          </p>
        </div>
      `
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Brief envoyé avec succès',
        files: fileLinks.length
      })
    };

  } catch (error) {
    console.error('❌ Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
