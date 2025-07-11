const avatarSettingsHTML = `
  <div class="avatar-settings-container">
    <h1>Avatar Settings</h1>

    <label for="avatar-upload">Upload Avatar (PNG, JPEG, GIF; max 200x200)</label><br/>
    <input type="file" id="avatar-upload" accept="image/png, image/jpeg, image/gif" />
    <img id="avatar-preview" alt="Avatar Preview" style="width: 200px; height: 200px; border-radius: 50%; border: 1px solid #ccc; margin-top: 0.5rem; object-fit: contain;" />

    <h2 style="margin-top: 2rem;">Select Your Avatar Frame</h2>
    <div id="frame-options" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <img src="/frames/frame1.png" alt="Frame 1" data-frame="frame1" class="frame-option" style="width: 100px; height: 100px; cursor: pointer; border: 2px solid transparent; border-radius: 50%;" />
      <img src="/frames/frame2.png" alt="Frame 2" data-frame="frame2" class="frame-option" style="width: 100px; height: 100px; cursor: pointer; border: 2px solid transparent; border-radius: 50%;" />
      <img src="/frames/frame3.png" alt="Frame 3" data-frame="frame3" class="frame-option" style="width: 100px; height: 100px; cursor: pointer; border: 2px solid transparent; border-radius: 50%;" />
    </div>

    <h3>Live Preview</h3>
    <div style="position: relative; width: 200px; height: 200px;">
      <img id="live-avatar-preview" src="" alt="Avatar Live Preview" style="width: 200px; height: 200px; border-radius: 50%; object-fit: contain; border: 1px solid #ccc;" />
      <img id="live-frame-preview" src="/frames/frame1.png" alt="Frame Live Preview" style="position: absolute; top: 0; left: 0; width: 200px; height: 200px; pointer-events: none; border-radius: 50%;" />
    </div>

    <button id="save-avatar-settings" class="btn-save" style="margin-top: 1rem; background-color: #9333ea; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">Save Settings</button>
    <div id="save-message" style="margin-top: 0.5rem; font-weight: bold;"></div>
  </div>
`;
